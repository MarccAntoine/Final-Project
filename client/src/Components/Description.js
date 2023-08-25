import { styled } from "styled-components";
import {IoIosArrowUp} from "react-icons/io"


const Description = ({descIsUp, setDescIsUp}) =>
{
    return (
    <Container>
        <UpButton onClick={() => {setDescIsUp(!descIsUp)}}>{descIsUp ? (<ArrowUp style={{transform: "rotate(180deg)"}}/>) : (<ArrowUp />)}</UpButton>
    </Container>
    )
}

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`

const UpButton = styled.button`
    background-color: transparent;
    border: none;
    position: absolute;
    top: -10px;
    width: 10%;
    height: fit-content;
    opacity: 50%;
    transition: all 0.5s ease-out;

    &:focus {
        outline: none;
    }


    @media only screen and (min-width: 850px) {
        &:hover {
        cursor: pointer;
        opacity: 75%;
        transform: scale(1.1);
    }
    }

    @media only screen and (max-width: 850px) {
        width: 20%;
    }

    @media only screen and (max-width: 500px) {
        width: 30%;
        top: 1%
    }
`

const ArrowUp = styled(IoIosArrowUp)`
    color: white;
    width: 100%;
    height: auto;

    transition: all 0.5s ease-out;
`

export default Description;