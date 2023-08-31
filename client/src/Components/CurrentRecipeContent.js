import { styled } from "styled-components";
import { ContentDiv, List, ListItem } from "./NewRecipeForm";

const CurrentRecipeContent = ({currentRecipe}) =>
{
    return (
        <Container>
            {currentRecipe._id === null ? (<h2>Click on a recipe to display it!</h2>) : (
            <>
                <RecipeName>{currentRecipe.name}</RecipeName>
                <Time>{currentRecipe.time}</Time>
                <ContentDiv>
                    <h3>Ingredients</h3>
                    <List>
                        {currentRecipe.ingredients.map((ingredient, index) => {return (
                            <ListItem key={index}>
                                <Quantity>{ingredient.quantity} {ingredient?.measurement}</Quantity>
                                <Name>{ingredient.product}</Name>
                                <Category>- {ingredient?.category}</Category>
                            </ListItem>
                        )})}
                    </List>
                </ContentDiv>
                <ContentDiv>
                    <h3>Instructions</h3>
                    <List>
                        {currentRecipe.instructions.map((singleInstruction, index) => {return (
                            <ListItem key={index}>
                                <Index>{index + 1}.</Index>
                                <Instruction>{singleInstruction}</Instruction>
                            </ListItem>
                        )})}
                    </List>
                </ContentDiv>
            </>
            )}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    gap: 10px;

    h2 {
        font-size: 30px;
        text-align: center;
        font-weight: lighter;
        color: black;
    }
`

const RecipeName = styled.h1`
    font-weight: lighter;
    font-size: 40px;
`

const Time = styled.span`
    font-weight: 500;
    font-size: 20px;
`

const Quantity = styled.span`

`

const Name = styled.span`

`

const Category = styled.span`

`

const Index = styled.span`

`

const Instruction = styled.span`

`

export default CurrentRecipeContent;