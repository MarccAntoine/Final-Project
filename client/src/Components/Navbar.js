import { styled } from "styled-components";

const Navbar = () =>
{
    return (
    <Container>
        <DropDownButton>My Kitchen</DropDownButton>
        <DropDownButton>Tricks and tips</DropDownButton>
        <OptionButton>Options</OptionButton>
    </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    height: 10vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    gap: 20px;

    z-index: 99;
`

const DropDownButton = styled.button`
    width: 17%;
    font-size: 25px;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    background-color: transparent;
`

const OptionButton = styled.button`
    width: 12%;
    font-size: 17px;
    border: none;
    background-color: transparent;

    position: absolute;
    right: 0%;
`

export default Navbar;