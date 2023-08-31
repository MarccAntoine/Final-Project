import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { KitchenContext } from "./KitchenContext";
import { useNavigate } from "react-router-dom";
import AddProductSmall from "./AddProductSmall";
import Loading from "./Loading";

const Grocery = () =>
{
    const [groceryList, setGroceryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {currentUser, triggerModification, setTriggerModification} = useContext(KitchenContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser)
        {
            fetch(`/api/grocery/${currentUser.groceryList}`)
            .then(res => res.json())
            .then((data) => {
                if(data.status === 400 || data.status === 500) {
                    throw new Error(data.message);
                }
                else {
                    setGroceryList(data.data.list);
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [currentUser.items])

    const deleteFromList = (item) =>
    {
        fetch(`/api/grocery/delete/${currentUser.groceryList}/${item.stockId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            })
            .then((res) => res.json())
            .then((json) => {
                setTriggerModification(triggerModification + 1)
                const { status } = json;
                if (status === 200) {
                } else {
                navigate("/error")
                }
            });
    }

    const addToStocks = (item) =>
    {
        fetch("/api/stock/add", {
            method: "POST",
            body: JSON.stringify({"itemData" : {...item, "userId": currentUser._id}}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            })
            .then((res) => res.json())
            .then((json) => {
                setTriggerModification(triggerModification + 1)
                const { status } = json;
                if (status === 201) {
                    deleteFromList(item)
                } else {
                navigate("/error")
                }
            });
    }

    return (
        <>
            {isLoading ? (<Loading />) : (        
                <Container>
                <ContentContainer>
                    <Title>My Grocery List</Title>
                    <ItemsList>
                        {groceryList !== [] && groceryList.map((item) => {return (
                            <ListItem key={item.stockId}>
                                <SideDiv>
                                    <Quantity>{item.quantity} {item.measurement}</Quantity>
                                    <Name>{item.product}</Name>
                                    <Category>- {item.category}</Category>
                                </SideDiv>
                                <SideDiv>
                                    <ListButtons onClick={(ev) => {ev.preventDefault(); deleteFromList(item)}}>Delete</ListButtons>
                                    <ListButtons onClick={(ev) => {ev.preventDefault(); addToStocks(item)}}>Add to stocks</ListButtons>
                                </SideDiv>
                            </ListItem>
                        )})}
                        <ListItemProd>
                            <AddProductSmall location={"grocery"}></AddProductSmall>
                        </ListItemProd>
                    </ItemsList>
                </ContentContainer>
            </Container>)}
        </>

    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #F8F6EF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 15px;
    position: relative;
`

const ContentContainer = styled.div`
    height: 80%;
    width: 46%;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    margin-top: 13vh;
    background-color: rgba(209,207,198,0.5);
    overflow: scroll;


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

const Title = styled.h1`
    color: white;
    font-weight: bold;
    font-size: 35px;
    margin-top: 20px;
`

const ItemsList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px 40px;
    width: 100%;
    font-weight: lighter;
    font-size: 20px;
`

const ListItem = styled.li`
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 20px;

    &:hover {
            background-color: rgba(209,207,198,0.3);
        }
`

const ListItemProd = styled(ListItem)`
    margin: 15px 2% 100px 2%;
    padding: 0px;

    &:hover {
            background-color: transparent;
        }
`

const SideDiv = styled.div`
display: flex;
gap: 10px;
align-items: center;
`

const Quantity = styled.span`

`

const Name = styled.span`

`

const Category = styled.span`
    font-size: 14px;
`

const ListButtons = styled.button`
    font-family: inherit;
    font-weight: bold;
    font-size: 11px;
    text-decoration: underline;
    border: none;
    background-color: transparent;
    border-radius: 15px;
    padding: 4px;
    visibility: hidden;

    ${ListItem}:hover & {
        visibility: visible;
    }

    &:hover {
        cursor: pointer;
        background-color: rgba(209,207,198,0.6);
}
`

export default Grocery;