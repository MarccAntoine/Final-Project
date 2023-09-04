import { styled } from "styled-components";
import {Background, Container, CloseButton, AddForm, SeparationDiv, Title, initialForm, ExpInput, UnitInput, MeasureSelect, Notification, ConfirmButton} from "./AddStockButton"
import { useContext, useEffect, useState } from "react";
import { KitchenContext } from "../KitchenContext";
import {measurement} from "../../helpers/MainItemsDatabase"
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const EditStock = ({edit, setEdit}) =>
{
    const [deleteAll, setDeleteAll] = useState(false);
    const [formData, setFormData] = useState(initialForm);
    const [notification, setNotification] = useState(false)
    const {currentUser, setTriggerModification, triggerModification} = useContext(KitchenContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (edit)
        {
            setFormData({...formData, "stockId": edit.stockId, "category": edit.category, "product": edit.product, "measurement" : edit.measurement, "expiration" : edit.expiration, "userId" : currentUser._id, "quantity" : edit.quantity})
        }
    }, [edit])

    const handleChange = (ev) =>
    {
        if (ev.target.id === "deleteAll")
        {
            if (!deleteAll)
            {
                setDeleteAll(true);
                setFormData({...formData, "quantity" : 0, "expiration" : "", "measurement" : ""})
            }
            else {
                setDeleteAll(false);
                setFormData({...formData, "quantity" : edit.quantity, "expiration" : edit.expiration, "measurement" : edit.measurement})
            }
        }
        else if (ev.target.id === "expiration")
        {
            const input = ev.target.value.replace(/[^\d/]/g, '');
            let formatted = input;
        
            if ((input.length === 2 || input.length === 5) && input.length >= formData.expiration.length)
            {
                formatted = formatted + "/"
            }
    
            setFormData({...formData, [ev.target.id]: formatted})
        }
        else if (ev.target.id === "quantity")
        {
            const input = ev.target.value.replace(/[^\d/]/g, '');
            setFormData({...formData, [ev.target.id]: input})
        }
        else 
        {
            setFormData({...formData, [ev.target.id]: ev.target.value})
        }
    }

    const sendModif = (ev) =>
    {
        ev.preventDefault();

        if (formData.expiration.length > 0 && !(moment(formData.expiration, 'MM/DD/YY', true).isValid())) {setNotification("Please enter a valid date"); return}
        if (formData.quantity.length < 0) {setNotification("Please enter a valid quantity"); return}

        if (formData.quantity != 0)
        {
            fetch("/api/stock/modify", {
                method: "PUT",
                body: JSON.stringify({"itemData" : formData}),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                })
                .then((res) => res.json())
                .then((json) => {
                    setTriggerModification(triggerModification + 1)
                    setFormData(initialForm)
                    setNotification(null)
                    const { status, message } = json;
                    if (status === 200) {
                    setEdit(false)
                    } else {
                    navigate("/error")
                    }
                });
        }
        else 
        {
            fetch(`/api/stock/delete/${currentUser._id}/${formData.stockId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                })
                .then((res) => res.json())
                .then((json) => {
                    setTriggerModification(triggerModification + 1)
                    setFormData(initialForm)
                    setNotification(null)
                    setDeleteAll(false)
                    const { status } = json;
                    if (status === 200) {
                    setEdit(false)
                    } else {
                    navigate("/error")
                    }
                });
        }
    }

    return(
        <>
        {edit &&
        <>
            <Background></Background>
            <Container style={{backgroundColor: "#ECC49C"}}>
                <CloseButton onClick={() => {setEdit(false); setDeleteAll(false); setFormData(initialForm); setNotification(null)}}>X</CloseButton>
                <AddForm>
                    <SeparationDiv><Title>Edit Product : {edit.product}</Title></SeparationDiv>
                    <SeparationDiv style={{margin: "0px"}}>
                        <CheckLabel>
                            <CheckBox id="deleteAll" onChange={handleChange} type="checkbox"></CheckBox>
                            Delete
                        </CheckLabel>
                    </SeparationDiv>
                    <SeparationDiv style={{margin: "0px"}}>
                        <UnitInput disabled={deleteAll ? true : false} autoComplete="off" id="quantity" value={formData.quantity} placeholder="Qty" onChange={handleChange}></UnitInput>

                        <MeasureSelect disabled={deleteAll ? true : false} id="measurement" value={formData.measurement} onChange={handleChange}>
                            <option value={undefined}> </option> 
                            {measurement.map((unit) => {return (<option value={unit} key={unit}>{unit}</option>)})}
                        </MeasureSelect>
                    </SeparationDiv>
                    <SeparationDiv>
                        <ExpInput disabled={deleteAll ? true : false} autoComplete="off" maxLength={8} id="expiration" value={formData.expiration} placeholder="Exp: MM/DD/YY" onChange={handleChange}></ExpInput>
                    </SeparationDiv>
                    <SeparationDiv style={{flexDirection: "column"}}>
                        <Notification>{notification ? notification : ""}</Notification>
                        <ConfirmButton onClick={sendModif}>Confirm</ConfirmButton>
                    </SeparationDiv>
                </AddForm>

            </Container>
        </>}
        </>
    )
}

const CheckBox = styled.input`
    border: none;
    outline: none;
`

const CheckLabel = styled.label`
    color: white;
    margin-left: 5px;
    width: 100%;
    font-size: 17px;
    display: flex;
    align-items: center;
    gap: 10px;

    @media only screen and (max-width: 850px) {
            font-size: 1.1rem;
        }
`


export default EditStock