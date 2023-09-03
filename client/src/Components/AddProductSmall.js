import { styled } from "styled-components";
import { MeasureSelect, UnitInput, initialForm, ItemInputDiv, CatSelect, Plus } from "./stocks/AddStockButton";
import { useContext, useEffect, useState } from "react";

import { itemSearch } from "../helpers/fuzzyTesting";
import {measurement, categories} from "../helpers/MainItemsDatabase"
import { KitchenContext } from "./KitchenContext";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";

const AddProductSmall = ({location, recipeFormData, setRecipeFormData}) =>
{
    const {currentUser, triggerModification, setTriggerModification} = useContext(KitchenContext)
    const [formData, setFormData] = useState(initialForm)
    const [notification, setNotification] = useState(null)
    const [showForm, setShowForm] = useState(false)
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
        setShowForm(false)

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
        <Container style={{backgroundColor: (!showForm ? ("transparent") : ("#b8ccac"))}}>
        {!showForm ? (<ToggleButton aria-label="New Product" onClick={() => setShowForm(true)}>Add</ToggleButton>) : (
            <>
                <SectionContainer>
                    <label htmlFor="quantity" >Quantity</label>
                    <UnitInput autoComplete="off" id="quantity" value={formData.quantity} placeholder="Qty" onChange={handleChange}></UnitInput>

                    <label htmlFor="measurement" >Measurement unit</label>
                    <MeasureSelect id="measurement" value={formData.measurement} onChange={handleChange}>
                        <option value={undefined}> </option> 
                        {measurement.map((unit) => {return (<option value={unit} key={unit}>{unit}</option>)})}
                    </MeasureSelect>
                </SectionContainer>
                <SectionContainer>
                    <ItemInputDiv>
                        <DropDown setFormData={setFormData} formData={formData} location={"product"}/>
                    </ItemInputDiv>
                </SectionContainer>
                <SectionContainer>
                    <label htmlFor="category" >Category</label>
                    <CatSelect id="category" value={formData.category} onChange={handleChange}>
                        {categories.map((category) => {return (<option value={category} key={category}>{category}</option>)})}
                    </CatSelect>
                    <AddButton aria-label="Add Product" onClick={sendProduct}>
                        <Plus />
                    </AddButton>
                </SectionContainer>
                <Notification>{notification ? (notification) : (null)}</Notification>
            </>
        )}
        </Container>
    )
}

const Container = styled.form`
    width: 95%;
    height: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: inherit;
    padding: 10px;
    position: relative;
`

const ToggleButton = styled.button`
    width: 65px;
    height: 30px;
    border: none;
    background-color: #b8ccac;
    border-radius: 15px;
    color: white;
    font-family: inherit;
    font-weight: bold;
    font-size: 20px;


    &:hover {
        filter: brightness(1.05);
        cursor: pointer;
    }
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