import { styled } from "styled-components";
import AddStockButton from "./AddStockButton";
import { useContext, useEffect, useState } from "react";
import { KitchenContext } from "../KitchenContext";
import EditStock from "./EditStock";
import { dateTesting } from "../../helpers/dateTesting";

const Stocks = () =>
{
    const {currentUser} = useContext(KitchenContext)
    const [sides, setSides] = useState({"left": undefined, "right": undefined})
    const [itemsByCategory, setItemsByCategory] = useState(null)
    const [edit, setEdit] = useState(false)

    useEffect(() =>
    {
        if (currentUser)
        {
            if (currentUser.items.length > 0)
            {
                let separation = {};
                let middle = 0;
                let left = [];
                let right = [];
        
                let total = currentUser.items.reduce((acc, item) => {
                    let category = item.category
    
                    if (!separation[category]) {separation[category] = []}
    
                    separation[category].push(item)
    
                    return (acc + 1)
                }, 0)
        
                setItemsByCategory(separation)
        
                Object.keys(separation).forEach((category) => {
                    if (middle < (total / 2))
                    {
                        middle += separation[category].length
                        left.push(category)
                    }
                    else {right.push(category)}
                })
        
                setSides({"left": left, "right": right})
            }
        }
    }, [currentUser])

    return (
        <Container>
            <ContentContainer>
                {itemsByCategory !== null ? (                
                <TopContainer>
                    <SideContainer>
                        {sides.left.map((category) => {
                            return (
                            <CategoryDiv key={category}>
                                <CategoryTitle>{category}</CategoryTitle>
                                <CategoryList>
                                    {itemsByCategory[category].map((item) => {
                                        return (
                                            <CategoryItem key={item.stockId}>
                                                <SideDiv>
                                                    <Qty>{item.quantity} {item.measurement}</Qty>
                                                    <Name>{item.product}</Name>
                                                </SideDiv>
                                                <SideDiv>
                                                    <Exp style={dateTesting(item.expiration) ? {backgroundColor: 'rgba(212, 122, 115, 0.7)'} : {}}>{item.expiration}</Exp>
                                                    <DeleteButton onClick={() => {setEdit(item)}}>Edit</DeleteButton>
                                                </SideDiv>
                                            </CategoryItem>
                                        )
                                    })}
                                </CategoryList>
                            </CategoryDiv>)
                        })}
                    </SideContainer>
                    <SideContainer>
                        {sides.right.map((category) => {
                                return (
                                <CategoryDiv key={category}>
                                    <CategoryTitle>{category}</CategoryTitle>
                                    <CategoryList>
                                        {itemsByCategory[category].map((item) => {
                                            return (
                                                <CategoryItem key={item.stockId}>
                                                    <SideDiv>
                                                        <Qty>{item.quantity} {item.measurement}</Qty>
                                                        <Name>{item.product}</Name>
                                                    </SideDiv>
                                                    <SideDiv>
                                                        <Exp style={dateTesting(item.expiration) ? {backgroundColor: 'rgba(212, 122, 115, 0.7)'} : {}}>{item.expiration}</Exp>
                                                        <DeleteButton onClick={() => {setEdit(item)}}>Edit</DeleteButton>
                                                    </SideDiv>
                                                </CategoryItem>
                                            )
                                        })}
                                    </CategoryList>
                                </CategoryDiv>)
                            })}
                    </SideContainer>
                </TopContainer>) : (<NoStock>You don't have any saved stocks!</NoStock>)}
                <AddStockButton location={"stock"} />
                <EditStock location={"stock"} edit={edit} setEdit={setEdit}/>
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

    const NoStock = styled.span`
        font-size: 2.4rem;
        font-weight: lighter;
        margin-bottom: 10px;
    `

    const SideContainer = styled.div`
        width: 45%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;


        @media only screen and (max-width: 500px) {
            width: 75%;
        }
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
        overflow: scroll;

        @media only screen and (max-width: 500px) {
            flex-direction: column;
            padding-top: 70px;
            gap: 10px;
        }
    `

    const CategoryDiv = styled.div`
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px 0px;
        gap: 5px;
    `

    const CategoryTitle = styled.h3`
        width: 90%;
        background-color: rgba(209,207,198,0.6);
        border-radius: 20px;
        padding: 12px 20px;
        color: white;
        font-size: 1.3rem;
    `

    const CategoryList = styled.ul`
        width: 85%;
        display: flex;
        flex-direction: column;
        font-weight: lighter;
    `

    const SideDiv = styled.div`
        display: flex;
        gap: 10px;
        align-items: center;
    `

    const CategoryItem = styled.li`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 7px;
        border-radius: 20px;
        
        &:hover {
            background-color: rgba(209,207,198,0.3);
        }
    `

    const Qty = styled.span`
        font-size: 1rem;
    `

    const Name = styled.span`
        font-size: 1rem;
    `

    const Exp = styled.span`
        padding: 6px;
        border-radius: 10px;
        font-size: 1rem;
    `

    export const DeleteButton = styled.button`
        background-color: transparent;
        border-radius: 10px;
        padding: 5px;
        border: none;
        font-size: 0.8rem;
        font-weight: bold;
        text-decoration: underline;
        visibility: hidden;

        &:hover {
            cursor: pointer;
            background-color: rgba(209,207,198,0.6);
        }

        ${CategoryItem}:hover & { 
            visibility: visible;
        }

        @media only screen and (max-width: 850px) {
            visibility: visible;
        }
    `

export default Stocks;