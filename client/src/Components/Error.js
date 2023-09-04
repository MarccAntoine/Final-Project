import { styled } from "styled-components";

const ErrorForOhFor = () =>
{
    return (
    <Container>
        <h2>It seems like you're lost</h2>
        <h1>404</h1>
        <h3>Return to the homepage or try again later if the problem persists.</h3>
    </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    color: #E99F54;
    text-align: center;
    padding: 0px 20px;

    h2 {
        font-size: 3rem;
    }

    h1 {
        font-size: 10rem;
    }

    h3 {
        font-size: 1.8rme;
        font-weight: normal;
    }
`

export default ErrorForOhFor;