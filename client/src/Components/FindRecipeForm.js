import { styled } from "styled-components";
import { CloseButton } from "./stocks/AddStockButton";
import { useEffect, useState } from "react";



const FindRecipeForm = ({setFindRecipe, currentUser, setAddRecipe, setRecipeToAdd}) =>
{
    const [stocks, setStocks] = useState([])
    const [selectedStocks, setSelectedStocks] = useState(new Set())
    const [results, setResults] = useState([])
    const apiKey = process.env.REACT_APP_SPOONACULAR_KEY;

    useEffect(() =>
    {
        if (currentUser.items)
        {
            const stocksName = new Set(currentUser.items.map((stock) => {return stock.product}))
            setStocks(stocksName)
        }
    }, [currentUser])

    const handleClick = (ev) =>
    {
        ev.preventDefault();
        document.activeElement.blur()

        if (selectedStocks.size < 4 && !selectedStocks.has(ev.target.value))
        {
            const stocksLi = new Set([...selectedStocks, ev.target.value])
            setSelectedStocks(stocksLi)
        }
        else if (selectedStocks.has(ev.target.value))
        {
            const stocksLi = new Set(Array.from(selectedStocks).filter((stock) => stock !== ev.target.value))
            setSelectedStocks(stocksLi)
        }
    }

    const handleConfirm = (ev) =>
    {
        ev.preventDefault()

        if (selectedStocks.size === 0) {return}

        const ingredientsQuery = Array.from(selectedStocks).reduce((acc, item) => {return (acc += (item.toLowerCase()) + ",+")}, "").slice(0, -2).replace(/ /g, "%20")

        fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsQuery}&number=5&ranking=1&apiKey=${apiKey}`)
        .then(res => res.json())
        .then((data) => {
            if(data.status === 400 || data.status === 500) {
                throw new Error(data.message);
            }
            else {
                setResults(data)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const fetchInstructions = async (recipeId) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`);
            const data = await response.json();
        
            if (data.status === 400 || data.status === 500) {
            throw new Error(data.message);
            } else {
            return data[0];
            }
        } catch (error) {
            console.error(error);
        }
        };

    const handleChoice = async (ev, index) =>
    {
        ev.preventDefault();

        const instructions = await fetchInstructions(results[index].id)

        let instructionsArray = []

        if (instructions.steps.length !== 0)
        {
            instructionsArray = instructions.steps.map((instruc) => {return (instruc.step)})
        }

        const missedIngredients = results[index].missedIngredients.map((ingredient) =>
        {
            return ({"product" : ingredient.name, "quantity" : ingredient.amount, "measurement" : ingredient.unitShort, "category" : ingredient.aisle})
        })
        const usedIngredients = results[index].usedIngredients.map((ingredient) =>
        {
            return ({"product" : ingredient.name, "quantity" : ingredient.amount, "measurement" : ingredient.unitShort, "category" : ingredient.aisle})
        })

        const ingredients = [...usedIngredients, ...missedIngredients]

        setFindRecipe(false)
        setAddRecipe(true)
        setRecipeToAdd({"instructions" : instructionsArray, "ingredients" : ingredients, "name" : results[index].title})
    }

    return (
        <>
            <Container>
                <ContentContainer>
                    <CloseButton onClick={() => setFindRecipe(false)}>X</CloseButton>
                    <Title>Find recipe from stocks</Title>
                    <Instruction>Please select up to 4 ingredients from your stocks you would you want in the recipe .</Instruction>
                    <StocksDiv>
                        <StocksList>
                            {stocks.length !== 0 && Array.from(stocks).map((stock) => {
                                return (<StockItem style={{backgroundColor : (selectedStocks.has(stock) ? "#b8ccac" : "rgba(255, 255, 255, 0.3)")}} onClick={handleClick} key={stock} value={stock}>{stock}</StockItem>)
                            })}
                        </StocksList>
                    </StocksDiv>
                    <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
                    <ResultsDiv>
                        {results.length === 0 ? (<h3>Select products to find recipes!</h3>) : (
                            <ResultsList>
                                {results.map((recipe, index) =>
                                {
                                    return (
                                        <ResultItem key={recipe.id} onClick={(ev) => {handleChoice(ev, index)}}>
                                            <Name>{recipe.title}</Name>
                                            <UsedOrUnused>Used ingredients: {recipe.usedIngredientCount}<br /> Additional ingredients: {recipe.missedIngredientCount}</UsedOrUnused>
                                        </ResultItem>
                                    )
                                })}
                            </ResultsList>
                        )}
                    </ResultsDiv>
                </ContentContainer>
            </Container>

        </>
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

const Title = styled.h2`
    color: white;
    font-weight: bold;
    font-size: 1.8rem;
    margin-top: 20px;
    border: none;
    width: 50%;
    text-align: center;
    padding: 5px 7px;
    border-radius: 25px;
`

const Instruction = styled.h4`
    color: white;
    font-weight: lighter;
    font-size: 1.4rem;
    margin-top: 20px;
    border: none;
    width: 75%;
    text-align: center;
    padding: 5px 7px;
`

const StocksDiv = styled.div`
    width: 90%;
    height: fit-content;
    margin-top: 20px;
`

const StocksList = styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 2%;
`

const StockItem = styled.button`
    width: 23%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    border-radius: 20px;
    margin-bottom: 5px;
    font-family: inherit;
`

const ConfirmButton = styled.button`
    margin-top: 20px;
    height: 40px;
    padding: 0px 20px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    font-size: 1.6rem;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;

    &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.4)
    }
`

const ResultsDiv = styled.div`
    margin-top: 20px;
    width: 90%;
    min-height: 200px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    padding: 20px;

    h3 {
        font-size: 1.4rem;
        font-weight: lighter;
        text-align: center;
    }
`

const ResultsList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: flex-start;
`

const ResultItem = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 35px;
    border-radius: 12px;
    border: none;
    background-color: rgba(209,207,198,0.5);
    font-family: inherit;

    &:hover {
        background-color: rgba(209,207,198,0.3);
        cursor: pointer;
    }
`

const Name = styled.span`
    font-size: 0.8rem;
    text-align: left;

    @media only screen and (max-width: 850px) {
        font-size: 1rem;
    }
`

const UsedOrUnused = styled.span`
    font-size: 0.6rem;
    font-weight: bold;
    min-width: 40%;

    @media only screen and (max-width: 850px) {
        font-size: 0.8rem;
    }
`

export default FindRecipeForm;