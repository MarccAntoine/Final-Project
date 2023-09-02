import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { AddButton } from "./AddProductSmall";
import { Plus } from "./stocks/AddStockButton";
import { itemSearch } from "../helpers/fuzzyTesting";
import { ItemSuggestions, SuggestionButton, Suggestion, SuggestionCat, SuggestionTitle } from "./stocks/AddStockButton";

const initialForm = {
    "moment" : "",
    "recipe" : "",
    "recipeId" : "",
}

const AddPlan = ({sendPlanServer, dayPlan, currentUser}) =>
{
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState(initialForm)
    const [similar, setSimilar] = useState([])
    const [recipes, setRecipes] = useState([])

    const setSuggestion = (recipe) =>
    {
        setFormData({...formData, "recipe": recipe.name, "recipeId": recipe._id})
        setSimilar([]);
    }

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
        if (ev.target.id === "recipe")
        {
            const input = ev.target.value
            let result = itemSearch(input, recipes)
            console.log(result.matchingNames)
            if (input.length >= 2) {setSimilar(result.matchingNames)}
            else {setSimilar([])}
            setFormData({...formData, [ev.target.id]: input})
        }
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
            {!showForm ? (<ToggleButton onClick={() => setShowForm(true)}>Add</ToggleButton>) : (
                <FormContainer>
                    <MomentInput autoComplete="off" onChange={handleChange} placeholder="Moment" id="moment" value={formData.moment}></MomentInput>
                    <RecipeDiv>
                        <RecipeInput autoComplete="off" onChange={handleChange} placeholder="Recipe" id="recipe" value={formData.recipe}></RecipeInput>
                            {similar.length !== 0 ? (
                                <ItemSuggestions>
                                    <SuggestionTitle>Suggestions:</SuggestionTitle>
                                    {similar && similar.map((recipe) => {return (<SuggestionButton onClick={() => setSuggestion(recipe)} id="product" value={recipe.name} key={recipe.name}><Suggestion>{recipe.name}<SuggestionCat> - {recipe.time}</SuggestionCat></Suggestion></SuggestionButton>)})}
                                </ItemSuggestions>) : (<></>)}
                    </RecipeDiv>
                    <AddButton onClick={sendPlan}><Plus /></AddButton>
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