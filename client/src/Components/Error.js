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
        font-size: 50px;
    }

    h1 {
        font-size: 200px;
    }

    h3 {
        font-size: 30px;
        font-weight: normal;
    }

    @media only screen and (max-width: 800px) {
        h2 {
            font-size: 30px;
        }

        h1 {
            font-size: 80px;
        }

        h3 {
            font-size: 20px;
            font-weight: normal;
        }
    }
`

export default ErrorForOhFor;