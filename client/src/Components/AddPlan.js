import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { AddButton } from "./AddProductSmall";
import { Plus } from "./stocks/AddStockButton";
import { itemSearch } from "../helpers/fuzzyTesting";
import { ItemSuggestions, SuggestionButton, Suggestion, SuggestionCat, SuggestionTitle } from "./stocks/AddStockButton";
import DropDown from "./DropDown";

const initialForm = {
    "moment" : "",
    "recipe" : "",
    "recipeId" : "",
}

const AddPlan = ({sendPlanServer, dayPlan, currentUser}) =>
{
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState(initialForm)
    const [recipes, setRecipes] = useState([])

    useEffect(() =>
    {
        if (currentUser && showForm)
        {
            fetch(`/api/recipes/${currentUser._id}`)
            .then(res => res.json())
            .then((data) => {
                if(data.status === 400 || data.status === 500) {
                    throw new Error(data.message);
                }
                else {
                    setRecipes(data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [showForm])

    const handleChange = (ev) =>
    {
        setFormData({...formData, [ev.target.id] : ev.target.value})
    }

    const sendPlan = (ev) =>
    {
        ev.preventDefault()

        dayPlan.push(formData)

        sendPlanServer();

        setFormData(initialForm)

        setShowForm(false)
    }

    return (
        <Container>
            {!showForm ? (<ToggleButton aria-label="New Plan" onClick={() => setShowForm(true)}>Add</ToggleButton>) : (
                <FormContainer>
                    <label htmlFor="moment" >Moment</label>
                    <MomentInput autoComplete="off" onChange={handleChange} placeholder="Moment" id="moment" value={formData.moment}></MomentInput>
                    <RecipeDiv>
                        <DropDown recipes={recipes} location={"recipe"} setFormData={setFormData} formData={formData} />
                    </RecipeDiv>
                    <AddButton aria-label="Add Plan" onClick={sendPlan}><Plus /></AddButton>
                </FormContainer>
            )}
        </Container>
    )
}

const Container = styled.div`
    width: 70%;
    height: 50px;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
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

const FormContainer = styled.form`
    width: 100%;
    height: 100%;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: #b8ccac;
    font-weight: lighter;
    color: white;
    font-size: 20px;
`

const MomentInput = styled.input`
    height: 60%;
    width: 20%;
    border-radius: 20px;
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 0px 15px;
    text-align: center;
    font-family: inherit;
    color: white;
    position: relative;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        outline: none;
    }
`

const RecipeDiv = styled.div`
    height: 60%;
    width: 50%;
    font-weight: lighter;
    color: white;
    font-size: 20px;
    position: relative;
`

const RecipeInput = styled.input`
    height: 100%;
    width: 96%;
    border-radius: 20px;
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 0px 15px;
    text-align: center;
    color: white;
    font-family: inherit;


    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        outline: none;
    }
`

const ConfirmButton = styled.button`
    
`

export default AddPlan;