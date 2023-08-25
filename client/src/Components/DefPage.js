import { styled } from "styled-components";
import LoginButton from "./LoginButton";
import { useEffect, useState } from "react";
import Description from "./Description";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const DefPage = () =>
{
    const { isAuthenticated } = useAuth0();
    const [descIsUp, setDescIsUp] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {navigate('/homepage')}
    }, [isAuthenticated])

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
    font-size: 150px;
    color: white;
    font-weight: bold;

    @media only screen and (max-width: 850px) {
        font-size: 110px;
    }

    @media only screen and (max-width: 650px) {
        font-size: 80px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 70px;
    }
`

const ByMe = styled.h3`
    font-size: 20px;
    color: white;
    font-weight: lighter;

    @media only screen and (max-width: 850px) {
        font-size: 17px;
    }

    @media only screen and (max-width: 650px) {
        font-size: 15px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 12px;
    }
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