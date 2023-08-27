import { styled } from "styled-components";

const Type = ({step, setStep}) =>
{

    return (
        step === "initial" && 
            <>
                <Welcome>Welcome to FoodFlow!</Welcome>
                <Message>Before starting to use our services let's set up your kitchen.</Message>
                <Question>Are you creating your own FoodFlow kitchen or have you been invited to join an existing kitchen?</Question>
                <OptionsDiv>
                    <Option onClick={() => setStep('setup')} style={{borderRight: "0.5px solid white", borderRadius: "30px 0px 0px 30px"}}>My own</Option>
                    <Option onClick={() => setStep('invitation')} style={{borderLeft: "0.5px solid white", borderRadius: "0px 30px 30px 0px"}}>Invitation</Option>
                </OptionsDiv>
            </>
    )
}

const Welcome = styled.h1`
    font-size: 80px;
    color: white;

    @media only screen and (max-width: 850px) {
        font-size: 70px;
    }

    @media only screen and (max-width: 650px) {
        font-size: 60px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 40px;
    }
`

const Message = styled.h2`
    font-size: 40px;
    color: white;
    font-weight: normal;

    @media only screen and (max-width: 850px) {
        font-size: 35px;
    }

    @media only screen and (max-width: 650px) {
        font-size: 30px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 21px;
    }
`

const Question = styled.h3`
    font-size: 25px;
    color: white;
    font-weight: normal;

    @media only screen and (max-width: 850px) {
        font-size: 22px;
    }

    @media only screen and (max-width: 650px) {
        font-size: 20px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 18px;
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
    line-height: 1.3em;
    width: 50%;
    height: 100%;
    background-color: transparent;
    color: white;
    border: none;
    transition: font-size 0.5s ease;
    font-weight: bold;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        font-size: 27px;
        cursor: pointer;
    }

    @media only screen and (max-width: 1000px) {
        font-size: 20px;

        &:hover {
            font-size: 22px;
        }
    }

    @media only screen and (max-width: 850px) {
        font-size: 19px;

        &:hover {
            font-size: 21px;
        }
    }

    @media only screen and (max-width: 700px) {
        font-size: 17px;

        &:hover {
            font-size: 19px;
        }
    }

    @media only screen and (max-width: 500px) {
        font-size: 17px;

        &:hover {
            font-size: 19px;
        }
    }
`

export default Type;