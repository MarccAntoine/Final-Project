import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Type from "./Type";
import JoinInvitation from "./JoinInvitation";
import SetupNewEnv from "./SetUpNewEnv";
import { KitchenContext } from "../KitchenContext";
import { useAuth0 } from "@auth0/auth0-react";

const initialSetup = {
    "_id": undefined,
    "name" : undefined,
    "system" : undefined,
    "inviteCode" : undefined
}

const NewUserSetup = () =>
{

    const [step, setStep] = useState("initial");
    const {triggerModification, setTriggerModification} = useContext(KitchenContext)
    const { user } = useAuth0()
    const navigate = useNavigate();

    const fetchData = (ev, formData) =>
    {
        ev.preventDefault();
        let fetchLink;

        if (formData.inviteId) {fetchLink = "/api/newUser/invite"}
        else {fetchLink = "/api/newUser"}

        fetch(fetchLink, {
        method: "POST",
        body: JSON.stringify({"userData" : formData}),
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
            setTimeout(() =>
            {
                navigate(`/homepage`)
            }, 1500)
            } else {
            navigate("/error")
            }
        });
    }

    return (
        <Container>
            <ContentContainer>
                <Type step={step} setStep={setStep} />
                <JoinInvitation step={step} setStep={setStep} initialSetup={initialSetup} fetchData={fetchData} user={user} />
                <SetupNewEnv step={step} setStep={setStep} initialSetup={initialSetup} fetchData={fetchData} user={user}/>
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