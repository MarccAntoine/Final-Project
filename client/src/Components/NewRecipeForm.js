import { useContext, useState } from "react";
import { styled } from "styled-components";
import AddProductSmall, { AddButton } from "./AddProductSmall";
import { CloseButton, ConfirmButton, Notification, Plus } from "./stocks/AddStockButton";
import { KitchenContext } from "./KitchenContext";
import { useNavigate } from "react-router-dom";

const NewRecipeForm = ({setAddRecipe}) =>
{
    const [instruction, setInstruction] = useState("");
    const [recipeFormData, setRecipeFormData] = useState({"ingredients" : [], "instructions" : [], "name" : "", "time": ""})
    const [notification, setNotification] = useState(null);
    const {currentUser, setTriggerModification, triggerModification} = useContext(KitchenContext)
    const [showForm, setShowForm] = useState(false)
    const navigate = useNavigate();

    const handleChange = (ev) =>
    {
        if (ev.target.id === "instruction")
        {
            setInstruction(ev.target.value);
        }
        else 
        {
            setRecipeFormData({...recipeFormData, [ev.target.id] : ev.target.value})
        }
    }

    const addInstruction = (ev) =>
    {
        ev.preventDefault();

        setRecipeFormData({...recipeFormData, "instructions" : [...recipeFormData.instructions, instruction]})
        setInstruction("")
        setShowForm(false)
    }

    const sendRecipe = (ev) =>
    {
        ev.preventDefault();

        if (recipeFormData.name.length === 0) {setNotification("Please give a name to your recipe."); return}
        else if (recipeFormData.time.length === 0) {setNotification("Please add a time."); return}
        else if (recipeFormData.ingredients.length === 0) {setNotification("Please add ingredients."); return}
        else if (recipeFormData.instructions.length === 0) {setNotification("Please add instructions."); return}

        fetch("/api/recipes/add", {
            method: "POST",
            body: JSON.stringify({"recipeData" : {...recipeFormData, "userId": currentUser._id}}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            })
            .then((res) => res.json())
            .then((json) => {
                setTriggerModification(triggerModification + 1)
                setRecipeFormData(null)
                setAddRecipe(false)
                setNotification(null)
                const { status } = json;
                if (status === 201) {
                } else {
                navigate("/error")
                }
            });
    }


    return (
        <Container>
            <ContentContainer>
                <CloseButton onClick={(ev) => {ev.preventDefault(); setAddRecipe(false)}}>X</CloseButton>
                <HeadingDiv>
                <TitleInput autoComplete="off" value={recipeFormData.name} id="name" onChange={handleChange} placeholder="New Recipe.."></TitleInput>
                <TimeInput autoComplete="off" value={recipeFormData.time} id="time" onChange={handleChange} placeholder="Time"></TimeInput>
                </HeadingDiv>
                <ContentDiv>
                    <h3>Ingredients</h3>
                    <List>
                        {recipeFormData.ingredients !== [] && recipeFormData.ingredients.map((ingredient, index) => {return (
                            <ListItem key={index}>
                                <Quantity>{ingredient.quantity} {ingredient?.measurement}</Quantity>
                                <Name>{ingredient.product}</Name>
                                <Category>- {ingredient?.category}</Category>
                            </ListItem>
                        )})}
                        <ListItemProd>
                            <AddProductSmall setRecipeFormData={setRecipeFormData} recipeFormData={recipeFormData} location={"recipe"}></AddProductSmall>
                        </ListItemProd>
                    </List>
                </ContentDiv>
                <ContentDiv>
                    <h3>Instructions</h3>
                    <List>
                        {recipeFormData.instructions !== [] && recipeFormData.instructions.map((singleInstruction, index) => {return (
                            <ListItem key={index}>
                                <Index>{index + 1}.</Index>
                                <Instruction>{singleInstruction}</Instruction>
                            </ListItem>
                        )})}
                        <ListItemProd style={{marginBottom: "20px"}}>
                        {!showForm ? (<ToggleButton aria-label="New Instruction" onClick={() => setShowForm(true)}>Add</ToggleButton>) : (
                            <AddInstruction>
                                <label htmlFor="instruction" >Instruction</label>
                                <Step id="instruction" value={instruction} onChange={handleChange} placeholder="Instruction:"></Step>
                                <AddButton aria-label="Add Instruction" onClick={addInstruction}>
                                    <Plus />
                                </AddButton>
                            </AddInstruction>
                        )}
                        </ListItemProd>
                    </List>
                </ContentDiv>
                <ButtonDiv>
                    <ConfirmButton onClick={sendRecipe}>Add Recipe</ConfirmButton>
                    <Notification>{notification && notification}</Notification>
                </ButtonDiv>
                
            </ContentContainer>
        </Container>
    )
}


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    position: absolute;
    top: 0px;
    left: 0px;
    overflow: hidden;

    z-index: 75;
`

const ContentContainer = styled.div`
    height: 90%;
    width: 50%;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 5vh;
    background-color: rgba(209,207,198);
    overflow: scroll;
    position: relative;


    @media only screen and (max-width: 850px) {
        height: 80%;
        width: 80%;
    }

    @media only screen and (max-width: 500px) {
        height: 85%;
        width: 90%;
        padding-top: 15px;
    }
`

const HeadingDiv = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
`

const TitleInput = styled.input`
    color: white;
    font-weight: lighter;
    font-family: inherit;
    font-size: 1.8rem;
    margin-top: 20px;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    width: 50%;
    text-align: center;
    padding: 5px 7px;
    border-radius: 25px;

    &::placeholder {
        color: rgba(255, 255, 255, 0.8);
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.35)
    }

    &:focus {
        outline: none;
    }
`

const TimeInput = styled(TitleInput)`
    width: 25%;
`

export const ContentDiv = styled.div`
    width: 90%;
    height: 35%;
    padding: 10px 10px;
    margin-top: 20px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: scroll;

    h3 {
        padding-left: 15px;
        text-decoration: underline;
        font-size: 0.9rem;
    }
`

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.1rem;
    font-weight: lighter;
    padding-top: 5px;
    width: 100%;
`

export const ListItem = styled.li`
    margin: 13px 0px 0px 10px;
    display: flex;
    align-items: center;
    gap: 7px;

    @media only screen and (max-width: 500px) {
        margin: 5px 0px 0px 10px;
    }
`

const ListItemProd = styled(ListItem)`
    margin: 15px 2% 50px 2%;
    padding: 0px;
    border-radius: 25px;
    height: 50px;
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
            background-color: transparent;
        }

    @media only screen and (max-width: 500px) {
        height: 40px;
    }
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
    font-size: 1.3rem;


    &:hover {
        filter: brightness(1.05);
        cursor: pointer;
    }
`

const Quantity = styled.span`
    font-size: 1rem;
`

const Name = styled.span`
    font-size: 1rem;
`

const Category = styled.span`
    font-size: 0.8rem;
`

const Index = styled.span`
    font-size: 1rem;
`

const Instruction = styled.span`
    font-size: 1rem;
`

const AddInstruction = styled.form`
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

const Step = styled.input`
    width: 90%;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 0px 5px;
    height: 100%;
    border: none;
    color: white;
    font-family: inherit;
    font-size: 1rem;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

`

const ButtonDiv = styled.div`
    height: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    color: rgba(212, 122, 115, 0.9);
`

export default NewRecipeForm;