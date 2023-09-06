import { styled } from "styled-components";

//This is the whit-ish background used behind "pop-ups"
const Background = () =>
{
    return (
    <BackgroundWhite></BackgroundWhite>
    )
}

const BackgroundWhite = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    background-color: rgba(255,255,255,0.6);
    z-index: 70;
    pointer-events: none;
`

export default Background;