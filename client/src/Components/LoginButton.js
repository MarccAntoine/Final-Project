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
    font-size: 50px;
    background-color: transparent;
    border: none;

    &:focus {
        outline: none;
    }

    &:hover {
        cursor: pointer;
    }

    @media only screen and (max-width: 850px) {
        font-size: 44px;
    }

    @media only screen and (max-width: 650px) {
        font-size: 37px;
    }

    @media only screen and (max-width: 500px) {
        font-size: 33px;
    }
`

export default LoginButton;