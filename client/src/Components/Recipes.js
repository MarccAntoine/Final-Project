import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import NewRecipeForm from "./NewRecipeForm";
import { KitchenContext } from "./KitchenContext";

const Recipes = () =>
{
    const [addRecipe, setAddRecipe] = useState(false)
    const [recipes, setRecipes] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const {currentUser} = useContext(KitchenContext)

    useEffect(() => {
        if (currentUser)
        {
            fetch(`/api/recipes/${currentUser._id}`)
            .then(res => res.json())
            .then((data) => {
                if(data.status === 400 || data.status === 500) {
                    throw new Error(data.message);
                }
                else {
                    setRecipes(data.data);
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [currentUser])

    return (
        <>
            <Container>
                <ContentContainer>
                    <TopContainer>
                        <SideContainer></SideContainer>
                        <SideContainer></SideContainer>
                    </TopContainer>
                    <AddButton onClick={() => setAddRecipe(true)}>Add Recipe</AddButton>
                </ContentContainer>
            </Container>
            {addRecipe && (<>
                    <Background></Background>
                    <NewRecipeForm setAddRecipe={setAddRecipe}></NewRecipeForm>
                </>
            )}
        </>
    )
}

const Background = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    background-color: rgba(255,255,255,0.7);
    z-index: 70;
`

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #F8F6EF;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

const ContentContainer = styled.div`
    height: 85%;
    width: 85%;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 5vh;


    @media only screen and (max-width: 650px) {
        height: 90%;
        width: 90%;
    }

    @media only screen and (max-width: 500px) {
        height: 100%;
        width: 100%;
        border-radius: 0px;
}
`

const SideContainer = styled.div`
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid black;
    overflow: scroll;
`

const TopContainer = styled.div`
    height: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 5%;
    overflow: hidden;
`

const AddButton = styled.button`
    width: fit-content;
    height: fit-content;
    border-radius: 25px;
    padding: 10px 15px;
    color: white;
    font-size: 20px;
    font-family: inherit;
    font-weight: 500;
    background-color: rgba(209,207,198,0.6);
    border: none;
    text-align: center;

    &:hover {
        cursor: pointer;
    }
`

export default Recipes;