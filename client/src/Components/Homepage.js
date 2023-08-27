import { styled } from "styled-components"
import Loading from "./Loading"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { KitchenContext } from "./KitchenContext"

const Homepage = () =>
{
    const {currentStock} = useContext(KitchenContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentStock === null) 
        {
            navigate('/profile/setup')
        }
    }, [currentStock])

    return (
    <Container>
        <ContentContainer>
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
    gap: 5px;
    position: relative;
    overflow: hidden;
    margin-top: 5vh;
    border: 1px solid black;


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

export default Homepage;