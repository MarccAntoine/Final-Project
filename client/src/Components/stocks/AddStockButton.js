import { styled } from "styled-components";
import {CiCirclePlus} from "react-icons/ci"
import { useContext, useState } from "react";
import moment from 'moment';
import { KitchenContext } from "../KitchenContext";
import { useNavigate } from "react-router-dom";

const {itemSearch, categories, measurement} = require('../../helpers/fuzzyTesting')

const initialForm = {
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

        if (formData.expiration.length > 0 && !(moment(formData.expiration, 'MM/DD/YY', true).isValid())) {window.alert("Please enter a valid date"); return}
        if (formData.product.length <= 1) {window.alert("Please enter a valid item"); return}
        if (formData.category.length <= 1) {window.alert("Please enter a valid category"); return}
        if (formData.quantity.length < 0) {window.alert("Please enter a valid quantity"); return}

        fetch("/api/newStock", {
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
            const { status } = json;
            if (status === 201) {
            setButtonState("button")
            } else {
            navigate("/error")
            }
        });
        
    }

    return (
    <Container>
        {buttonState === "button" && (<AddButton onClick={() => setButtonState("add")}><Plus /><p>Add Item</p></AddButton>)}
        {buttonState === "add" && (
            <AddForm>
                <UnitInput autoComplete="off" id="quantity" value={formData.quantity} placeholder="Qty" onChange={handleChange}></UnitInput>

                <MeasureSelect id="measurement" value={formData.measurement} onChange={handleChange}>
                    <option value={undefined}> </option> 
                    {measurement.map((unit) => {return (<option value={unit} key={unit}>{unit}</option>)})}
                </MeasureSelect>

                <ItemInputDiv>
                    <ItemInput autoComplete="off" id="product" value={formData.product} placeholder="Item" onChange={handleChange}></ItemInput>
                    {similar.length !== 0 ? (
                    <ItemSuggestions>
                        {similar && similar.map((item) => {return (<SuggestionButton onClick={() => setSuggestion(item)} id="product" value={item.name} key={item.name}><Suggestion>{item.name}</Suggestion></SuggestionButton>)})}
                    </ItemSuggestions>) : (<></>)}
                </ItemInputDiv>

                <CatSelect id="category" value={formData.category} onChange={handleChange}>
                    {categories.map((category) => {return (<option value={category} key={category}>{category}</option>)})}
                </CatSelect>

                <ExpInput maxLength={8} id="expiration" value={formData.expiration} placeholder="Exp: MM/DD/YY" onChange={handleChange}></ExpInput>

                <ConfirmButton onClick={sendProduct}>Add</ConfirmButton>
            </AddForm>)}
    </Container>
    )
}

const Container = styled.div`
    width: 80%;
    height: 55px;
    border-radius: 25px;
    background-color: #95B88D;
`

const AddButton = styled.button`
    width: 100%;
    height: 100%;
    border-radius: inherit;
    color: white;
    font-size: 35px;
    font-family: inherit;
    font-weight: lighter;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2%;

    &:hover {
        cursor: pointer;
    }
`

const Plus = styled(CiCirclePlus)`
    height: 60%;
    width: auto;
`

const AddForm = styled.form`
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
    gap: 1.5%;
`

const ItemInputDiv = styled.div`
    height: 60%;
    width: 35%;
    position: relative;
`

const UnitInput = styled.input`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    height: 60%;
    width: 6%;
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
`

const MeasureSelect = styled.select`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    height: 60%;
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
    height: 60%;
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
    max-height: 90px;
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
    align-items: center;
    gap: 5px;
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

const Suggestion = styled.li`
    width: 100%;
    height: 100%;
    font-size: 15px;
    text-align: center;
    color: white;
    font-weight: lighter;
    border-radius: 15px;
`

const ExpInput = styled.input`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    height: 60%;
    width: 13%;
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
`

const ConfirmButton = styled.button`
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
    }
`

export default AddStockButton;