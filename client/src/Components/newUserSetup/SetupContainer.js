import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Type from "./Type";
import JoinInvitation from "./JoinInvitation";
import SetupNewEnv from "./SetUpNewEnv";

const NewUserSetup = () =>
{
    const navigate = useNavigate()
    const [step, setStep] = useState("initial")

    return (
        <Container>
            <ContentContainer>
                <Type step={step} setStep={setStep} />
                <JoinInvitation step={step} setStep={setStep} />
                <SetupNewEnv step={step} setStep={setStep} />
            </ContentContainer>
        </Container>
    )
}

const ContentContainer = styled.div`
    height: 85%;
    width: 85%;
    border-radius: 50px;
    background-color: #95B88D;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8%;
    position: relative;
    overflow: hidden;
    padding: 40px;


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

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #F8F6EF;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`

export default NewUserSetup;