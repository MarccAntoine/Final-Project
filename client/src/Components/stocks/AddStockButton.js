import { styled } from "styled-components";
import {CiCirclePlus} from "react-icons/ci"
import { useContext, useState } from "react";
import moment from 'moment';
import { KitchenContext } from "../KitchenContext";
import { useNavigate } from "react-router-dom";

import { itemSearch } from "../../helpers/fuzzyTesting";
import {measurement, categories} from "../../helpers/MainItemsDatabase"

export const initialForm = {
    "quantity": "",
    "measurement": "",
    "product": "",
    "category": "",
    "expiration": ""
}

const AddStockButton = () =>
{
    const {currentUser, setTriggerModification, triggerModification} = useContext(KitchenContext);
    const [buttonState, setButtonState] = useState("button");
    const [similar, setSimilar] = useState([]);
    const [formData, setFormData] = useState(initialForm);
    const [notification, setNotification] = useState(null)
    const navigate = useNavigate();

    const setSuggestion = (item) =>
    {
        setFormData({...formData, "product": item.name, "category": item.category})
        setSimilar([]);
    }

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
        else if (ev.target.id === "product")
        {
            const input = ev.target.value
            let result = itemSearch(input)
            if (input.length >= 2) {setSimilar(result.matchingNames)}
            else {setSimilar([])}
            setFormData({...formData, [ev.target.id]: input})
        }
        else {setFormData({...formData, [ev.target.id]: ev.target.value})}
    }

    const sendProduct = (ev) =>
    {
        ev.preventDefault();

        if (formData.expiration.length > 0 && !(moment(formData.expiration, 'MM/DD/YY', true).isValid())) {setNotification("Please enter a valid date"); return}
        if (formData.product.length <= 1) {setNotification("Please enter a valid item"); return}
        if (formData.category.length <= 1) {setNotification("Please enter a valid category"); return}
        if (formData.quantity.length < 0) {setNotification("Please enter a valid quantity"); return}

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

    return (
        <>
        <ContainerButton>
            <AddButton onClick={() => setButtonState("add")}><Plus /><p>Add Product</p></AddButton>
        </ContainerButton>
        <>
        {buttonState === "add" && (
            <>
                <Background></Background>
                <Container>
                    <AddForm>
                        <CloseButton onClick={(ev) => {ev.preventDefault(); setButtonState("button"); setFormData(initialForm); setNotification(null)}}>X</CloseButton>
                        <SeparationDiv>
                            <Title>New Product</Title>
                        </SeparationDiv>

                        <SeparationDiv>
                            <UnitInput autoComplete="off" id="quantity" value={formData.quantity} placeholder="Qty" onChange={handleChange}></UnitInput>

                            <MeasureSelect id="measurement" value={formData.measurement} onChange={handleChange}>
                                <option value={undefined}> </option> 
                                {measurement.map((unit) => {return (<option value={unit} key={unit}>{unit}</option>)})}
                            </MeasureSelect>
                        </SeparationDiv>

                        <SeparationDiv>
                            <ItemInputDiv>
                                <ItemInput autoComplete="off" id="product" value={formData.product} placeholder="Item" onChange={handleChange}></ItemInput>
                                {similar.length !== 0 ? (
                                <ItemSuggestions>
                                    <SuggestionTitle>Suggestions:</SuggestionTitle>
                                    {similar && similar.map((item) => {return (<SuggestionButton onClick={() => setSuggestion(item)} id="product" value={item.name} key={item.name}><Suggestion>{item.name}<SuggestionCat> - {item.category}</SuggestionCat></Suggestion></SuggestionButton>)})}
                                </ItemSuggestions>) : (<></>)}
                            </ItemInputDiv>
                        </SeparationDiv>

                        <SeparationDiv>
                            <CatSelect id="category" value={formData.category} onChange={handleChange}>
                                {categories.map((category) => {return (<option value={category} key={category}>{category}</option>)})}
                            </CatSelect>

                            <ExpInput autoComplete="off" maxLength={8} id="expiration" value={formData.expiration} placeholder="Exp: MM/DD/YY" onChange={handleChange}></ExpInput>
                        </SeparationDiv>

                        <SeparationDiv style={{flexDirection: "column"}}>
                            <Notification>{notification ? notification : ""}</Notification>
                            <ConfirmButton onClick={sendProduct}>Add</ConfirmButton>
                        </SeparationDiv>
                    </AddForm>
                </Container>
            </>
            )}
        </>
        </>
    )
}

export const Background = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    background-color: rgba(255,255,255,0.7);
    z-index: 70;
`

const ContainerButton = styled.div`
    width: fit-content;
    height: fit-content;
    padding: 10px;
    background-color: rgba(209,207,198,0.6);
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
    background-color: #95B88D;
    z-index: 75;
`

const AddButton = styled.button`
    width: 100%;
    height: 100%;
    border-radius: inherit;
    color: white;
    font-size: 20px;
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

const Plus = styled(CiCirclePlus)`
    height: 25px;
    width: auto;
`

export const AddForm = styled.form`
    width: 100%;
    height: 100%;
    border-radius: inherit;
    color: white;
    font-size: 20px;
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
    font-size: 18px;
    border-radius: 50%;

    &:hover {
        background-color: rgba(255,255,255,0.2);
        cursor: pointer;
    }
`

export const Title = styled.h2`
    width: 90%;
    font-weight: 500;
    font-size: 20px;
    text-align: center;
    overflow: hidden;
`

export const SeparationDiv = styled.div`
    height: 15%;
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6%;
    margin: 7px 0px;
`

const ItemInputDiv = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`

export const UnitInput = styled.input`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    height: 100%;
    width: 47%;
    border-radius: 10px;
    font-size: 15px;
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
`

export const MeasureSelect = styled.select`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    height: 100%;
    width: 47%;
    border-radius: 10px;
    font-size: 15px;
    padding: 5px 5px;
    text-align: center;

    &:focus {
        outline: none;
    }
`

const CatSelect = styled.select`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    height: 100%;
    width: 47%;
    border-radius: 10px;
    font-size: 15px;
    padding: 5px 5px;
    text-align: center;

    &:focus {
        outline: none;
    }
`

const ItemInput = styled.input`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    height: 100%;
    width: 96%;
    border-radius: 10px;
    font-size: 15px;
    padding: 0px 5px;
    text-align: center;
    position: relative;
    z-index: 50;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        outline: none;
    }
`

const ItemSuggestions = styled.ul`
    width: 100%;
    max-height: 270%;
    overflow: scroll;
    padding: 10px;
    position: absolute;
    top: 100%;
    left: 0%;
    background-color: #95B88D;
    z-index: 40;
    border-radius: 0px 0px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
    font-family: inherit;
`

const SuggestionButton = styled.button`
    width: 95%;
    height: 30px;
    background-color: transparent;
    border: none;

    &:hover {
        cursor: pointer;
    }
`

const SuggestionTitle = styled.h5`
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 5px;
`

const Suggestion = styled.li`
    width: 100%;
    height: 100%;
    font-size: 15px;
    text-align: left;
    color: white;
    font-weight: 300;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 4px;
    white-space: nowrap;

    &:hover {
        background-color: rgba(255,255,255,0.2);
    }
`

const SuggestionCat = styled.span`
    font-weight: 100;
    font-size: 12px;
    color: white;
    white-space: nowrap;
`

export const ExpInput = styled.input`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    height: 100%;
    width: 47%;
    border-radius: 10px;
    font-size: 15px;
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
`

export const Notification = styled.span`
    width: 100%;
    text-align: center;
    height: 30%;
    font-size: 12px;
    font-weight: bold;
    margin-top: -5px;
`

export const ConfirmButton = styled.button`
    width: fit-content;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    border: none;
    font-weight: bold;
    font-size: 18px;
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
`

export default AddStockButton;