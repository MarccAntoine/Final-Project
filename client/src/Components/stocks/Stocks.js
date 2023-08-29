import Loading from "../Loading";
import { styled } from "styled-components";
import AddStockButton from "./AddStockButton";
import { useContext, useEffect, useState } from "react";
import { KitchenContext } from "../KitchenContext";

const Stocks = () =>
{
    const {currentUser} = useContext(KitchenContext)
    const [sides, setSides] = useState({"left": undefined, "right": undefined})
    const [itemsByCategory, setItemsByCategory] = useState(null)

    useEffect(() =>
    {
        if (currentUser.items.length > 0)
        {
            let separation = {};
            let middle = 0;
            let left = [];
            let right = [];
    
            let total = currentUser.items.reduce((acc, item) => {
                let category = item.category
                separation = {...separation, [category]: (separation[category] || 0) + 1}
                return (acc + 1)
            }, 0)
    
            setItemsByCategory(separation)
    
            Object.keys(separation).forEach((category) => {
                if (middle <= (total / 2))
                {
                    middle += separation[category]
                    left.push(category)
                }
                else {right.push(category)}
            })
    
            setSides({"left": left, "right": right})
        }
    }, [currentUser.items])

    return (
        <Container>
            <ContentContainer>
                {itemsByCategory != null > 0 ? (                
                <TopContainer>
                    <SideContainer></SideContainer>
                    <SideContainer></SideContainer>
                </TopContainer>) : (<h2>You don't have any saved stocks!</h2>)}
                <AddStockButton />
            </ContentContainer>
        </Container>
        )
    }
    
    const Container = styled.div`
        width: 100vw;
        height: 100vh;
        background-color: #F8F6EF;
        display: flex;
        align-items: center;
        justify-content: center;
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
        position: relative;
        margin-top: 5vh;

        h2 {
            font-size: 40px;
            font-weight: lighter;
            margin-bottom: 10px;
        }
    
    
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
        min-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid black;
    `

    const TopContainer = styled.div`
        height: 70%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        align-items: center;
        justify-content: center;
        gap: 5%;
    `

export default Stocks;