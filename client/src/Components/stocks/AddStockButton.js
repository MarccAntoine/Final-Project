import { styled } from "styled-components";
import {CiCirclePlus} from "react-icons/ci"
import { useContext, useState } from "react";
import moment from 'moment';
import { KitchenContext } from "../KitchenContext";
import { useNavigate } from "react-router-dom";
import {measurement, categories} from "../../helpers/MainItemsDatabase"
import DropDown from "../DropDown";
import Background from "../WindowBackground";

export const initialForm = {
    "quantity": "",
    "measurement": "",
    "product": "",
    "category": "",
    "expiration": ""
}

const AddStockButton = ({location}) =>
{
    const {currentUser, setTriggerModification, triggerModification} = useContext(KitchenContext);
    const [buttonState, setButtonState] = useState("button");
    const [formData, setFormData] = useState(initialForm);
    const [notification, setNotification] = useState(null)
    const navigate = useNavigate();

    const handleChange = (ev) =>
    {
        if (ev.target.id === "quantity")
        {
            const input = ev.target.value.replace(/[^\d/]/g, '');
            setFormData({...formData, [ev.target.id]: input})
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
        else {setFormData({...formData, [ev.target.id]: ev.target.value})}
    }

    const sendProduct = (ev) =>
    {
        ev.preventDefault();

        if (formData.expiration.length > 0 && !(moment(formData.expiration, 'MM/DD/YY', true).isValid()) && location === "stock") {setNotification("Please enter a valid date"); return}
        if (formData.product.length <= 1) {setNotification("Please enter a valid item"); return}
        if (formData.category.length <= 1) {setNotification("Please enter a valid category"); return}
        if (formData.quantity.length < 0) {setNotification("Please enter a valid quantity"); return}

        if (location === "stock")
        {
            fetch("/api/stock/add", {
                method: "POST",
                body: JSON.stringify({"itemData" : {...formData, "userId": currentUser._id}}),
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
                    const { status } = json;
                    if (status === 201) {
                    setButtonState("button")
                    } else {
                    navigate("/error")
                    }
                });
        }
    }

    return (
        <>
        <ContainerButton>
            <AddButton aria-label="New Product" onClick={() => setButtonState("add")}><Plus /><p>Add Product</p></AddButton>
        </ContainerButton>
        <>
        {buttonState === "add" && (
            <>
                <Background />
                <Container>
                    <AddForm>
                        <CloseButton aria-label="Close Section" onClick={(ev) => {ev.preventDefault(); setButtonState("button"); setFormData(initialForm); setNotification(null)}}>X</CloseButton>
                        <SeparationDiv>
                            <Title>Add Product</Title>
                        </SeparationDiv>

                        <SeparationDiv>
                            <label htmlFor="quantity" >Quantity</label>
                            <UnitInput autoComplete="off" id="quantity" value={formData.quantity} placeholder="Qty" onChange={handleChange}></UnitInput>

                            <label htmlFor="measurement" >Measurement Unit</label>
                            <MeasureSelect id="measurement" value={formData.measurement} onChange={handleChange}>
                                <option value={undefined}> </option> 
                                {measurement.map((unit) => {return (<option value={unit} key={unit}>{unit}</option>)})}
                            </MeasureSelect>
                        </SeparationDiv>

                        <SeparationDiv>
                            <ItemInputDiv>
                                <DropDown formData={formData} setFormData={setFormData} location={"product"}/>
                            </ItemInputDiv>
                        </SeparationDiv>

                        <SeparationDiv>
                            <label htmlFor="category" >Category</label>
                            <CatSelect id="category" value={formData.category} onChange={handleChange}>
                                {categories.map((category) => {return (<option value={category} key={category}>{category}</option>)})}
                            </CatSelect>

                            {location === "stock" && (<><label htmlFor="expiration" >Expiration Date</label><ExpInput autoComplete="off" maxLength={8} id="expiration" value={formData.expiration} placeholder="Exp: MM/DD/YY" onChange={handleChange}></ExpInput></>)}
                        </SeparationDiv>

                        <SeparationDiv style={{flexDirection: "column"}}>
                            <Notification>{notification ? notification : ""}</Notification>
                            <ConfirmButton aria-label="Add product" onClick={sendProduct}>Add</ConfirmButton>
                        </SeparationDiv>
                    </AddForm>
                </Container>
            </>
            )}
        </>
        </>
    )
}

const ContainerButton = styled.div`
    width: fit-content;
    height: fit-content;
    padding: 10px;
    background-color: #b8ccac;
    border-radius: 25px;
`

export const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 25%;
    aspect-ratio: 1;
    border-radius: 25px;
    background-color: #b8ccac;
    z-index: 80;

    @media only screen and (max-width: 850px) {
        width: 50%;
    }

    @media only screen and (max-width: 850px) {
        width: 65%;
    }
`

const AddButton = styled.button`
    width: 100%;
    height: 100%;
    border-radius: inherit;
    color: white;
    font-size: 1.4rem;
    font-family: inherit;
    font-weight: 500;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    gap: 2%;

    &:hover {
        cursor: pointer;
    }
`

export const Plus = styled(CiCirclePlus)`
    height: 25px;
    width: auto;
`

export const AddForm = styled.form`
    width: 100%;
    height: 100%;
    border-radius: inherit;
    color: white;
    font-size: 1.4rem;
    font-family: inherit;
    font-weight: lighter;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const CloseButton = styled.button`
    position: absolute;
    top: 3%;
    right: 3%;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1.3rem;
    border-radius: 50%;

    &:hover {
        background-color: rgba(255,255,255,0.2);
        cursor: pointer;
    }

    @media only screen and (max-width: 500px) {
        font-size: 1.8rem;
        top: 2%;
    }
`

export const Title = styled.h2`
    width: 90%;
    font-weight: 500;
    font-size: 1.4rem;
    text-align: center;
    overflow: hidden;

    @media only screen and (max-width: 850px) {
            font-size: 1.6rem;
        }
`

export const SeparationDiv = styled.div`
    height: 15%;
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6%;
    margin: 7px 0px;
    color: white;

    @media only screen and (max-width: 500px) {
        gap: 5px;
    }
`

export const ItemInputDiv = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`

export const UnitInput = styled.input`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: inherit;
    height: 100%;
    width: 47%;
    border-radius: 10px;
    font-size: 0.9rem;
    padding: 0px 5px;
    text-align: center;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        filter: brightness(91%);
    }

    @media only screen and (max-width: 850px) {
            font-size: 0.9rem;
        }
`

export const MeasureSelect = styled.select`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: inherit;
    height: 100%;
    width: 47%;
    border-radius: 10px;
    font-size: 0.9rem;
    padding: 5px 5px;
    text-align: center;

    &:focus {
        outline: none;
    }

    @media only screen and (max-width: 850px) {
            font-size: 0.9rem;
        }

    @media only screen and (max-width: 500px) {
        font-size: 0.8rem;
        padding: 0px;
    }
`

export const CatSelect = styled.select`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: inherit;
    height: 100%;
    min-width: 47%;
    max-width: 70%;
    border-radius: 10px;
    font-size: 0.9rem;
    padding: 5px 5px;
    text-align: center;

    &:focus {
        outline: none;
    }

    @media only screen and (max-width: 850px) {
        font-size: 0.9rem;
    }

    @media only screen and (max-width: 500px) {
        font-size: 0.8rem;
        padding: 0px;
    }
`

export const ExpInput = styled.input`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    height: 100%;
    width: 47%;
    border-radius: 10px;
    font-size: 0.9rem;
    padding: 0px 5px;
    text-align: center;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        filter: brightness(91%);
    }

    @media only screen and (max-width: 850px) {
            font-size: 0.9rem;
        }
`

export const Notification = styled.span`
    width: 100%;
    text-align: center;
    height: 30%;
    font-size: 0.7rem;
    font-weight: bold;
    margin-top: -5px;

    @media only screen and (max-width: 850px) {
            font-size: 1rem;
        }
`

export const ConfirmButton = styled.button`
    width: fit-content;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    border: none;
    font-weight: bold;
    font-size: 1.2rem;
    border-radius: 10px;
    height: 60%;
    padding: 0px 10px;

    &:focus {
        outline: none;
    }

    &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.4);
    }

    @media only screen and (max-width: 850px) {
            font-size: 1.4rem;
        }
`

export default AddStockButton;