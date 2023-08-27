import { Link } from "react-router-dom";
import { styled } from "styled-components";
import LogoutButton from "../LogoutButton";

const ComputerNavbar = () =>
{
    return (
    <Container>

        <DropDownDiv>
            <DropDownButton to={'/homepage'}>My Kitchen</DropDownButton>
            <DropDown>
                <DropDownLink to={'/stocks'}>Stocks</DropDownLink>
                <DropDownLink to={'/planner'}>Planner</DropDownLink>
                <DropDownLink to={'/grocery'}>Grocery</DropDownLink>
                <DropDownLink to={'/recipes'}>Recipes</DropDownLink>
            </DropDown>
        </DropDownDiv>
        <DropDownDiv>
            <DropDownButton to={'/blog'}>Tricks and Tips</DropDownButton>
            <DropDown>
                <DropDownLink to={'/blog'}>Blog</DropDownLink>
                <DropDownLink to={'/blog/recipes'}>Recipes</DropDownLink>
            </DropDown>
        </DropDownDiv>
        <OptionDiv>
            <RelOptionDiv>
                <OptionButton>Options</OptionButton>
                <DropDownOption>
                    <DropDownLink to={'/profile'}>Profile</DropDownLink>
                    <LogoutButton />
                </DropDownOption>
            </RelOptionDiv>
        </OptionDiv>
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

    @media only screen and (max-width: 850px) {
        display: none;
    }
`

const DropDownDiv = styled.div`
    width: 17%;
    background-color: transparent;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0px;
`

const DropDownButton = styled(Link)`
    width: 100%;
    font-size: 25px;
    font-weight: bold;
    border: none;
    background-color: transparent;
    color: black;
    text-decoration: none;
    text-align: center;

    &:focus {
        outline: none;
    }
`

const DropDown = styled.div`
    position: absolute;
    top: 55px;
    width: 75%;
    background-color: #ECC49C;
    border-radius: 25px;
    height: 0px;
    transition: all 0.3s linear;
    visibility: hidden;
    overflow: hidden;
    font-size: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    ${DropDownDiv}:hover & {
        visibility: visible;
        height: fit-content;
        padding: 20px 0px;
    }
`

const DropDownLink = styled(Link)`
    background-color: transparent;
    border: none;
    color: black;
    text-decoration: none;
    font-weight: lighter;
    text-align: center;
    border-radius: 20px;
    width: 90%;
    padding: 10px 0px;

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: rgba(0,0,0,0.03);
        font-weight: 500;
    }
`

const OptionDiv = styled.div`
    width: 12%;
    background-color: transparent;
    position: absolute;
    right: 0%;
`

const RelOptionDiv = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0px;
`

const OptionButton = styled.button`
    width: 90%;
    font-size: 17px;
    border: none;
    background-color: transparent;
`

const DropDownOption = styled.div`
    position: absolute;
    top: 45px;
    width: 75%;
    background-color: #ECC49C;
    border-radius: 25px;
    height: 0px;
    transition: all 0.3s linear;
    visibility: hidden;
    overflow: hidden;
    font-size: 17px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    ${RelOptionDiv}:hover & {
        visibility: visible;
        height: fit-content;
        padding: 20px 0px;
    }
`

export default ComputerNavbar;