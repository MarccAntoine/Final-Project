import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

const LogoutButton = () =>
{
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <OutButton onClick={() =>  logout()}>
                Log Out
            </OutButton>
        )
        )
}

const OutButton = styled.button`
    background-color: transparent;
    border: none;
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: lighter;
    border-radius: 15px;
    width: 90%;
    height: 35px;
    border-radius: 17px;

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: rgba(0,0,0,0.03);
        font-weight: 500;
        cursor: pointer;
    }
`

export default LogoutButton;