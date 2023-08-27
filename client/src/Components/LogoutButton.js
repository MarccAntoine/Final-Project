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

    &:focus {
        outline: none;
    }

    &:hover {
        cursor: pointer;
    }
`

export default LogoutButton;