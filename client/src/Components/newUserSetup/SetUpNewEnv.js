import { styled } from "styled-components";
import {FiArrowLeft} from "react-icons/fi"
import { useState } from "react";

const SetupNewEnv = ({step, setStep}) =>
{
    const [selected, setSelected] = useState(null)

    return (
        step === "setup" && 
            <>
                <BackButton onClick={() => setStep("initial")}><BackArrow /></BackButton>
                <Question>Please setup your preferences, you can change those choices later in your profile.</Question>
                <OptionsDiv>
                    {selected === 1 ? (<SelectedOption onClick={() => setSelected(1)} style={{borderRight: "0.5px solid white", borderRadius: "30px 0px 0px 30px"}}>Metric</SelectedOption>) : (<Option onClick={() => setSelected(1)} style={{borderRight: "0.5px solid white", borderRadius: "30px 0px 0px 30px"}}>Metric</Option>)}
                    {selected === 2 ? (<SelectedOption onClick={() => setSelected(2)} style={{borderLeft: "0.5px solid white", borderRadius: "0px 30px 30px 0px"}}>Imperial</SelectedOption>) : (<Option onClick={() => setSelected(2)} style={{borderLeft: "0.5px solid white", borderRadius: "0px 30px 30px 0px"}}>Imperial</Option>)}
                </OptionsDiv>
                <ConfirmButton>Confirm</ConfirmButton>
            </>
    )
}

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

const OptionsDiv = styled.div`
    width: 30%;
    height: 13%;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    @media only screen and (max-width: 850px) {
        width: 45%;
        height: 11%;
    }

    @media only screen and (max-width: 500px) {
        width: 75%;
        height: 10%;
    }
`

const Option = styled.button`
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    background-color: transparent;
    color: white;
    border: none;
    font-weight: bold;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        font-size: 29px;
        cursor: pointer;
    }

    @media only screen and (max-width: 1000px) {
        font-size: 20px;

        &:hover {
            font-size: 24px;
        }
    }

    @media only screen and (max-width: 850px) {
        font-size: 19px;

        &:hover {
            font-size: 23px;
        }
    }

    @media only screen and (max-width: 700px) {
        font-size: 17px;

        &:hover {
            font-size: 13px;
        }
    }

    @media only screen and (max-width: 500px) {
        font-size: 17px;

        &:hover {
            font-size: 21px;
        }
    }
`

const SelectedOption = styled.button`
    font-size: 29px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
    font-weight: bold;

    @media only screen and (max-width: 1000px) {
        font-size: 24px;
    }

    @media only screen and (max-width: 850px) {
        font-size: 23px;
    }

    @media only screen and (max-width: 700px) {
        font-size: 21px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 21px;
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

export default SetupNewEnv;