import { styled, keyframes } from "styled-components";

const Loading = () =>
{
    return (<AnimDiv><WhiteLogo>FoodFlow</WhiteLogo><OrangeLogo>FoodFlow</OrangeLogo></AnimDiv>)
}

const Load = keyframes`
    0% {width: 0%}
    95% {width: 100%}
`

const AnimDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const WhiteLogo = styled.div`
    height: fit-content;
    font-size: 50px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: bold;


    @media only screen and (max-width: 850px) {
        font-size: 40px;
    }

    @media only screen and (max-width: 650px) {
        font-size: 30px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 25px;
    }
`

const OrangeLogo = styled.div`
    height: fit-content;
    font-size: 50px;
    color: #E99F54;
    font-weight: bold;
    overflow: hidden;
    opacity: 0.7;

    transition: all 4s cubic-bezier(1, 1, 1, 1);

    position: absolute;
    top: 0px;
    left: 0px;

    animation-name: ${Load};
    animation-duration: 4s;
    animation-iteration-count: infinite;

    @media only screen and (max-width: 850px) {
        font-size: 40px;
    }

    @media only screen and (max-width: 650px) {
        font-size: 30px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 25px;
    }
`

export default Loading;