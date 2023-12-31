import { styled } from "styled-components";
import LoginButton from "./LoginButton";
import { useContext, useEffect, useState } from "react";
import Description from "./Description";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { KitchenContext } from "./KitchenContext";

const DefPage = () =>
{
    const { isAuthenticated } = useAuth0();
    const {currentUser} = useContext(KitchenContext)
    const [descIsUp, setDescIsUp] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && currentUser !== undefined) 
        {
            if (currentUser === null) {navigate('/profile/setup')}
            else {navigate('/homepage')}
        }
                // eslint-disable-next-line
    }, [isAuthenticated, currentUser])

    return (
        !isAuthenticated &&
        <Container>
            <ContentContainer>
                <Name>FoodFlow</Name>
                <ByMe>By Marc-Antoine Tremblay</ByMe>
                <LoginButton></LoginButton>
                {descIsUp ? (<DescDown><Description descIsUp={descIsUp} setDescIsUp={setDescIsUp}></Description></DescDown>) : (<DescDown style={{height: "22%", overflow: "hidden"}}><Description descIsUp={descIsUp} setDescIsUp={setDescIsUp}></Description></DescDown>)}
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
    background-color: #E99F54;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    position: relative;
    overflow: hidden;


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

const Name = styled.h1`
    font-size: 7rem;
    color: white;
    font-weight: bold;
`

const ByMe = styled.h3`
    font-size: 1.5rem;
    color: white;
    font-weight: lighter;
`

const DescDown = styled.div`
    width: 100%;
    height: 110%;

    transition: all 1s ease;

    z-index: 5;

    background-color: #ECC49C;

    position: absolute;
    bottom: -10%;
    left: 0%;

    @media only screen and (max-width: 500px) {
        border-radius: 25px;
        height: 113%;
    }
`

export default DefPage;