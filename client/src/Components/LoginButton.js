import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

const LoginButton = () =>
{
    const { loginWithRedirect, isAuthenticated } = useAuth0();


    return (
        !isAuthenticated && (
            <LogButton onClick={() =>  loginWithRedirect()}>
                Sign In
            </LogButton>
        )
        )
}

const LogButton = styled.button`
    margin-top: 35px;
    font-weight: normal;
    color: white;
    font-size: 3rem;
    background-color: transparent;
    border: none;
    border-radius: 25px;

    &:focus {
        outline: none;
    }

    &:hover {
        cursor: pointer;
    }
`

export default LoginButton;