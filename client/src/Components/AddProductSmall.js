import { styled } from "styled-components";
import { MeasureSelect, UnitInput, initialForm, ItemInput, ItemSuggestions, Suggestion, SuggestionButton, SuggestionCat, SuggestionTitle, ItemInputDiv, CatSelect, Plus } from "./stocks/AddStockButton";
import { useContext, useEffect, useState } from "react";

import { itemSearch } from "../helpers/fuzzyTesting";
import {measurement, categories} from "../helpers/MainItemsDatabase"
import { KitchenContext } from "./KitchenContext";
import { useNavigate } from "react-router-dom";

const AddProductSmall = ({location, recipeFormData, setRecipeFormData}) =>
{
    const {currentUser, triggerModification, setTriggerModification} = useContext(KitchenContext)
    const [formData, setFormData] = useState(initialForm)
    const [similar, setSimilar] = useState([])
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
            let result = itemSearch(input, "initialItems")
            if (input.length >= 2) {setSimilar(result.matchingNames)}
            else {setSimilar([])}
            setFormData({...formData, [ev.target.id]: input})
        }
        else {setFormData({...formData, [ev.target.id]: ev.target.value})}
    }

    const sendProduct = (ev) =>
    {
        ev.preventDefault();

        if (formData.product.length <= 1) {setNotification("Please enter a product"); return}
        if (location !== "recipe" && formData.category.length <= 1) {setNotification("Please choose a category"); return}
        if (formData.quantity.length < 0) {setNotification("Please enter a valid quantity"); return}

        if (location === "recipe")
        {
            setRecipeFormData({...recipeFormData, "ingredients" : [...recipeFormData.ingredients, formData]})
            setFormData(initialForm)
        }
        else 
        {
            fetch("/api/grocery/add", {
                method: "POST",
                body: JSON.stringify({"itemData" : {...formData, "userId": currentUser.groceryList}}),
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
                    } else {
                    navigate("/error")
                    }
                });
        }
    }

    return (
        <Container>
            <SectionContainer>
                <UnitInput autoComplete="off" id="quantity" value={formData.quantity} placeholder="Qty" onChange={handleChange}></UnitInput>
                <MeasureSelect id="measurement" value={formData.measurement} onChange={handleChange}>
                    <option value={undefined}> </option> 
                    {measurement.map((unit) => {return (<option value={unit} key={unit}>{unit}</option>)})}
                </MeasureSelect>
            </SectionContainer>
            <SectionContainer>
                <ItemInputDiv>
                    <ItemInput autoComplete="off" id="product" value={formData.product} placeholder="Item" onChange={handleChange}></ItemInput>
                    {similar.length !== 0 ? (
                    <ItemSuggestions style={{backgroundColor: "#b8ccac"}}>
                        <SuggestionTitle>Suggestions:</SuggestionTitle>
                        {similar && similar.map((item) => {return (<SuggestionButton onClick={() => setSuggestion(item)} id="product" value={item.name} key={item.name}><Suggestion>{item.name}<SuggestionCat> - {item.category}</SuggestionCat></Suggestion></SuggestionButton>)})}
                    </ItemSuggestions>) : (<></>)}
                </ItemInputDiv>
            </SectionContainer>
            <SectionContainer>
                <CatSelect id="category" value={formData.category} onChange={handleChange}>
                    {categories.map((category) => {return (<option value={category} key={category}>{category}</option>)})}
                </CatSelect>
                <AddButton onClick={sendProduct}>
                    <Plus />
                </AddButton>
            </SectionContainer>
            <Notification>{notification ? (notification) : (null)}</Notification>
        </Container>
    )
}

const Container = styled.form`
    width: 95%;
    height: 95%;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: inherit;
    background-color: #b8ccac;
    padding: 10px;
    position: relative;
`

const SectionContainer = styled.div`
    width: 33%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: white;
`

export const AddButton = styled.button`
    width: fit-content;
    border: none;
    background-color: transparent;
    justify-self: flex-end;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    color: white;

    &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.3);
    }
`

const Notification = styled.span`
    font-weight: bold;
    width: 100%;
    text-align: center;
    font-size: 12px;
    position: absolute;
    top: 110%;
`

export default AddProductSmall;