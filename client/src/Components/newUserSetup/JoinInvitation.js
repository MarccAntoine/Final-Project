import { styled } from "styled-components";
import {FiArrowLeft} from "react-icons/fi"
import { useState, useEffect } from "react";

const JoinInvitation = ({step, setStep, initialSetup, fetchData, user}) =>
{
    const [formData, setFormData] = useState(initialSetup);

    useEffect(() =>
    {
        setFormData({...formData, _id: user.sub})
    }, [])

    const handleChange = (ev) => 
    {
        setFormData({ ...formData, [ev.target.id]: ev.target.value });
    };

    return (
        step === "invitation" && 
            <>
                <BackButton onClick={() => setStep("initial")}><BackArrow /></BackButton>
                <FormContainer>
                    <Question>What is your preffered name?</Question>
                    <OptionsDiv id="name" onChange={handleChange}></OptionsDiv>
                    <Question>Please enter your invitation code</Question>
                    <OptionsDiv id="inviteCode" onChange={handleChange}></OptionsDiv>
                    <ConfirmButton onClick={(ev) => fetchData(ev, formData)}>Confirm</ConfirmButton>
                </FormContainer>
            </>
    )
}

const FormContainer = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6%;
`

const Question = styled.h3`
    font-size: 35px;
    color: white;
    font-weight: normal;

    @media only screen and (max-width: 850px) {
        font-size: 30px;
    }

    @media only screen and (max-width: 650px) {
        font-size: 25px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 22px;
    }
`

const OptionsDiv = styled.input`
    width: 30%;
    height: 12%;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    text-align: center;
    color: white;
    font-size: 25px;
    border: none;
    padding: 0px 20px;

    &:focus {
        outline: none;
    }

    @media only screen and (max-width: 850px) {
        width: 45%;
        height: 8%;
    }

    @media only screen and (max-width: 500px) {
        width: 75%;
        height: 9%;
    }
`

const ConfirmButton = styled.button`
    width: 17%;
    height: 9%;
    border-radius: 30px;
    background-color: rgba(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #95B88D;
    font-size: 29px;
    font-weight: bold;
    border: none;
    padding: 0px 20px;
    transition: all 0.5s ease;

    &:focus {
        outline: none;
    }

    &:hover {
        transform: scale(1.03);
        cursor: pointer;
    }

    @media only screen and (max-width: 850px) {
        width: 35%;
        height: 8%;
    }

    @media only screen and (max-width: 500px) {
        width: 60%;
        height: 9%;
    }
`

const BackButton = styled.button`
    position: absolute;
    top:2%;
    left: 1.5%;
    height: 8%;
    background-color: transparent;
    border:  none;
    transition: all 0.5s ease;

    &:focus {
        outline: none;
    }

    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
`

const BackArrow = styled(FiArrowLeft)`
    height: 100%;
    width: auto;
    color: white;
`

export default JoinInvitation;