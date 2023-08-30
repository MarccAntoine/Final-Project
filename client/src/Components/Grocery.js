import { styled } from "styled-components";
import AddStockButton from "./stocks/AddStockButton";
import { useContext, useEffect, useState } from "react";
import { KitchenContext } from "./KitchenContext";

const Grocery = () =>
{
    const [groceryList, setGroceryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {currentUser} = useContext(KitchenContext)

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
    }, [currentUser])

    return (
        <Container>
            <ContentContainer>
                <Title>My Grocery List</Title>
            </ContentContainer>
            <AddStockButton location={"grocery"} />
        </Container>
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
height: 75%;
width: 40%;
border-radius: 50px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
gap: 20px;
margin-top: 13vh;
background-color: rgba(209,207,198,0.5);


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

export default Grocery;