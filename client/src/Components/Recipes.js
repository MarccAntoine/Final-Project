import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import NewRecipeForm from "./NewRecipeForm";
import { KitchenContext } from "./KitchenContext";
import CurrentRecipeContent from "./CurrentRecipeContent";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { howManyInStock, recipeFilter } from "../helpers/RecipeFiltering";
import FindRecipeForm from "./FindRecipeForm";
import Background from "./WindowBackground";

const Recipes = () =>
{
    const param = (useParams())
    const [addRecipe, setAddRecipe] = useState(false)
    const [findRecipe, setFindRecipe] = useState(false)
    const [recipes, setRecipes] = useState([])
    const [showSort, setshowSort] = useState(false)
    const [recipeToAdd, setRecipeToAdd] = useState(null)
    const [sortChoice, setSortChoice] = useState("default")
    const [currentRecipe, setCurrentRecipe] = useState({_id: null})
    const [isLoading, setIsLoading] = useState(true);
    const {currentUser} = useContext(KitchenContext)

    useEffect(() => {
        if (recipes.length !== 0 && param.recipeId !== undefined)
        {
            let recipe = recipes.filter((reci) => reci._id === param.recipeId)
            setCurrentRecipe(recipe[0])
        }
        // eslint-disable-next-line
    }, [recipes])

    const fetchRecipes = () =>
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
                setSortChoice("default")
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (currentUser)
        {
            fetchRecipes();
        }
        // eslint-disable-next-line
    }, [currentUser])

    return (
        <>
        {isLoading ? (<Loading />) : (
            <>
                <Container>
                    <ContentContainer>
                        <TopContainer>
                            <SideContainer>
                                <FilterDiv>
                                    <FilterButton onClick={() => {setshowSort(!showSort); document.activeElement.blur();}}>Sort</FilterButton>
                                    {showSort ? (
                                        <SortingList>
                                            <Filter><FilterItemButton style={{backgroundColor : (sortChoice === "default" ? ("rgba(209,207,198,0.3)") : (null))}} onClick={() => {fetchRecipes(); setshowSort(false); setSortChoice("default")}}>Default</FilterItemButton></Filter>
                                            <Filter><FilterItemButton style={{backgroundColor : (sortChoice === "alpha" ? ("rgba(209,207,198,0.3)") : (null))}} onClick={() => {setRecipes(recipeFilter(recipes, null, "alpha")); setSortChoice("alpha"); setshowSort(false)}}>Alphabetical</FilterItemButton></Filter>
                                            <Filter><FilterItemButton style={{backgroundColor : (sortChoice === "stock" ? ("rgba(209,207,198,0.3)") : (null))}} onClick={() => {setRecipes(recipeFilter(recipes, currentUser.items, "stock")); setshowSort(false); setSortChoice("stock")}}>In stock</FilterItemButton></Filter>
                                        </SortingList>
                                    ) : (<></>)}
                                </FilterDiv>
                                <RecipeList>
                                {(recipes[0] !== null && recipes) && recipes.map((recipe) => {return (
                                    <RecipeItem key={recipe._id}>
                                        <RecipeButton onClick={() => {setCurrentRecipe(recipe); document.activeElement.blur()}} style={{backgroundColor : (currentRecipe._id === recipe._id ? ("rgba(209,207,198,0.3)") : (null))}}>
                                            <Name>{recipe.name}</Name>
                                            {recipe.time && (<Time> - {recipe.time}</Time>)}
                                            <InStock style={{backgroundColor : (((howManyInStock(recipe, currentUser.items) * 100) / recipe.ingredients.length) > 80 ? ("#b8ccac") : (null))}} >{howManyInStock(recipe, currentUser.items)}/{recipe.ingredients.length} In stock</InStock>
                                        </RecipeButton>
                                    </RecipeItem>
                                )})}
                                </RecipeList>
                            </SideContainer>
                            <RecipeContainer>
                                <CurrentRecipeContent currentRecipe={currentRecipe} />
                            </RecipeContainer>
                        </TopContainer>
                        <BottomContainer>
                            <AddButton onClick={() => setFindRecipe(true)}>Find Recipe</AddButton>
                            <AddButton onClick={() => setAddRecipe(true)}>Add Recipe</AddButton>
                        </BottomContainer>
                    </ContentContainer>
                </Container>
                {addRecipe && (<>
                        <Background />
                        <NewRecipeForm setAddRecipe={setAddRecipe} recipeToAdd={recipeToAdd} ></NewRecipeForm>
                    </>
                )}
                {findRecipe && (<>
                        <Background />
                        <FindRecipeForm setFindRecipe={setFindRecipe} currentUser={currentUser} setAddRecipe={setAddRecipe} setRecipeToAdd={setRecipeToAdd} ></FindRecipeForm>
                    </>
                )}
            </>
        )}
        </>
    )
}

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
    width: 90%;
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

    @media only screen and (max-width: 850px) {
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
    overflow: scroll;
    padding: 20px;
    position: relative;

    @media only screen and (max-width: 850px) {
        width: 75%;
    }
`

const RecipeContainer = styled(SideContainer)`
    width: 50%;
    border-radius: 25px;
    background-color: #e8e4dc;

    @media only screen and (max-width: 850px) {
        width: 90%;
        height: 250%;
    }
`

const TopContainer = styled.div`
    height: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 5%;
    overflow: hidden;

    @media only screen and (max-width: 850px) {
        flex-direction: column-reverse;
        padding-top: 70px;
    }
`

const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

const FilterDiv = styled.div`
    height: fit-content;
    width: 150px;
    position: absolute;
    top: 0px;
    left: 25px;
`

const FilterButton = styled.button`
    height: 30px;
    width: 150px;
    background-color: #e8e4dc;
    border-radius: 15px;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    font-size: 1.4rem;
    border: none;
    z-index: 15;

    &:hover {
        cursor: pointer;
    }
`

const AddButton = styled.button`
    width: fit-content;
    height: fit-content;
    border-radius: 25px;
    padding: 10px 15px;
    color: white;
    font-size: 1.3rem;
    font-family: inherit;
    font-weight: 500;
    background-color: rgba(209,207,198,0.6);
    border: none;
    text-align: center;

    &:hover {
        cursor: pointer;
    }
`

const RecipeList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    margin-top: 25px;
`

const SortingList = styled.ul`
    height: fit-content;
    width: 150px;
    background-color: #e8e4dc;
    border-radius: 15px;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    font-size: 1.4rem;
    padding-top: 40px;
    z-index: 10;
    gap: 4px;
`

const Filter = styled.li`
    width: 90%;

`

const FilterItemButton = styled.button`
    width: 100%;
    padding: 3px 0px;
    text-align: center;
    border-radius: 10px;
    font-size: 1rem;
    border: none;
    background-color: transparent;

    &:hover {
        background-color: rgba(209,207,198,0.3);
        cursor: pointer;
    }
`

const RecipeButton = styled.button`
    width: 100%;
    background-color: transparent;
    font-weight: lighter;
    font-family: inherit;
    padding: 5px;
    border-radius: 15px;
    border: none;

    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;

    &:hover {
        background-color: rgba(209,207,198,0.3);
        cursor: pointer;
    }
`

const RecipeItem = styled.li`
    width: 100%;
`

const Name = styled.h3`
    font-weight: lighter;
    font-size: 1.3rem;
    text-align: left;
    max-width: 75%;
`

const Time = styled.span`
    font-weight: 500;
    font-size: 0.8rem;
`

const InStock = styled.span`
    position: absolute;
    right: 10px;
    font-weight: 500;
    font-size: 0.8rem;
    border-radius: 10px;
    padding: 3px;
`

export default Recipes;