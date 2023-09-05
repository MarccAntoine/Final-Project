import { styled } from "styled-components";
import {FiArrowLeft} from "react-icons/fi"
import { useEffect, useState } from "react";

const SetupNewEnv = ({step, setStep, initialSetup, fetchData, user}) =>
{
    const [formData, setFormData] = useState(initialSetup);
    const [selected, setSelected] = useState(null)

    useEffect(() =>
    {
        setFormData({...formData, _id: user.sub})
        // eslint-disable-next-line
    }, [user])

    const handleChange = (ev) => 
    {
        setFormData({ ...formData, [ev.target.id]: ev.target.value });
    };

    return (
        step === "setup" && 
            <>
                <BackButton aria-label="Precedent Page" onClick={() => setStep("initial")}><BackArrow /></BackButton>
                <FormContainer>
                    <Title>Please setup your preferences, you can change those choices later in your profile.</Title>
                    <Question>What is your preferred name?</Question>
                    <label htmlFor="name">Name</label>
                    <InputDiv autoComplete="off" id="name" onChange={handleChange}></InputDiv>
                    <Question>What is your preferred measurement system?</Question>
                    <OptionsDiv>
                        {selected === 1 ? (<SelectedOption id="system" value={"metric"} onClick={(ev) => {setSelected(1); handleChange(ev)}} style={{borderRight: "0.5px solid white", borderRadius: "30px 0px 0px 30px"}}>Metric</SelectedOption>) : (<Option id="system" value={"metric"} onClick={(ev) => {setSelected(1); handleChange(ev)}} style={{borderRight: "0.5px solid white", borderRadius: "30px 0px 0px 30px"}}>Metric</Option>)}
                        {selected === 2 ? (<SelectedOption id="system" value={"imperial"} onClick={(ev) => {setSelected(2); handleChange(ev)}} style={{borderLeft: "0.5px solid white", borderRadius: "0px 30px 30px 0px"}}>Imperial</SelectedOption>) : (<Option id="system" value={"imperial"} onClick={(ev) => {setSelected(2); handleChange(ev)}} style={{borderLeft: "0.5px solid white", borderRadius: "0px 30px 30px 0px"}}>Imperial</Option>)}
                    </OptionsDiv>
                    <ConfirmButton onClick={(ev) => fetchData(ev, formData)}>Confirm</ConfirmButton>
                </FormContainer>
            </>
    )
}

const Title = styled.h2`
    font-size: 2rem;
    color: white;
    font-weight: normal;
`

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
    font-size: 1.9rem;
    color: white;
    font-weight: normal;
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
    font-size: 1.8rem;
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
        font-size: 1.9rem;
        cursor: pointer;
    }
`

const SelectedOption = styled.button`
    font-size: 1.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
    font-weight: bold;
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
    font-size: 1.8rem;
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

const InputDiv = styled.input`
    width: 30%;
    height: 12%;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    text-align: center;
    color: white;
    font-size: 1.5rem;
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

export default SetupNewEnv;