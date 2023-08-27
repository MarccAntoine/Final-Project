import { Link } from "react-router-dom";
import { styled } from "styled-components";
import LogoutButton from "../LogoutButton";
import {IoIosMenu} from "react-icons/io"
import { useState } from "react";

const MobileNavbar = () =>
{
    const [showNav, setShowNav] = useState(false)

    return (
        <>
        {showNav ? (
            <NavContainer>
                <Container>
                    <BurgerNav onClick={() => setShowNav(!showNav)} />
                    <LogoutButton />
                </Container>
                <DropDownButton to={'/homepage'}>My Kitchen</DropDownButton>
                <DropDownLink to={'/stocks'}>Stocks</DropDownLink>
                <DropDownLink to={'/planner'}>Planner</DropDownLink>
                <DropDownLink to={'/grocery'}>Grocery</DropDownLink>
                <DropDownLink to={'/recipes'}>Recipes</DropDownLink>
                <DropDownButton to={'/blog'}>Tricks and Tips</DropDownButton>
                <DropDownLink to={'/blog'}>Blog</DropDownLink>
                <DropDownLink to={'/blog/recipes'}>Recipes</DropDownLink>
                <DropDownButton to={'/profile'}>Profile</DropDownButton>
            </NavContainer>) : (        
            <Container>
                <Burger onClick={() => setShowNav(!showNav)} />
                <LogoutButton />
            </Container>
            )}
        </>
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
    gap: 80%;
    justify-content: space-between;
    background-color: transparent;
    gap: 20px;
    padding: 0px 20px;
    font-size: 20px;

    z-index: 99;

    @media only screen and (min-width: 850px) {
        display: none;
    }
`

const Burger = styled(IoIosMenu)`
    height: 95%;
    width: auto;
    color: black;
    opacity: 0.7;
`

const BurgerNav = styled(IoIosMenu)`
    height: 95%;
    width: auto;
    color: white;
    opacity: 0.7;
`

const NavContainer = styled.div`
    background-color: #E99F54;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4%;
    color: white;
`

const DropDownButton = styled(Link)`
    width: 100%;
    font-size: 25px;
    font-weight: bold;
    border: none;
    background-color: transparent;
    color: white;
    text-decoration: none;
    text-align: center;

    &:focus {
        outline: none;
    }

    @media only screen and (max-width: 850px) {
        font-size: 40px;
    }

    @media only screen and (max-width: 700px) {
        font-size: 35px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 25px;
    }
`

const DropDownLink = styled(Link)`
    background-color: transparent;
    border: none;
    color: black;
    text-decoration: none;
    color: white;

    &:focus {
        outline: none;
    }

    @media only screen and (max-width: 850px) {
        font-size: 33px;
    }

    @media only screen and (max-width: 700px) {
        font-size: 28px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 18px;
    }
`

export default MobileNavbar;