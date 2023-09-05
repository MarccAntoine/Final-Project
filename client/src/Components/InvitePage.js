import { useContext, useState } from "react";
import { styled } from "styled-components";
import { KitchenContext } from "./KitchenContext";

const InvitePage = () =>
{
    const [result, setResult] = useState("")
    const {currentUser} = useContext(KitchenContext)

    const getCode = () =>
    {
        if (currentUser)
        {
            fetch(`/api/invite/${currentUser._id}`)
                .then((response) => {return response.json()})
                .then((data) =>
                {
                    setResult(data.data)
                })
                .catch((err) => {console.log(err)})
        }
    }

    return (
        <Container>
            <ContentContainer>
                <h2>Invite collaborators in your FoodFlow kitchen</h2>
                <h4>By clicking the confirmation button, you will receive a unique code that can be shared with a single person. They will need to create a new account and enter this code when prompted. Once done, they will gain access to your FoodFlow kitchen, allowing them to perform the same tasks and operations as you do.</h4>
                <ButtonDiv>
                    {result ? (<Code>{result}</Code>) : <ConfirmButton onClick={getCode}>Get Code</ConfirmButton>}
                </ButtonDiv>
            </ContentContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #F8F6EF;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    `

const ContentContainer = styled.div`
    height: 85%;
    width: 85%;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-top: 5vh;
    text-align: center;

    h2 {
        font-size: 3rem;
        font-weight: lighter;
    }

    h4 {
        font-size: 1.5rem;
        font-weight: normal;
    }


    @media only screen and (max-width: 650px) {
        height: 90%;
        width: 90%;
    }

    @media only screen and (max-width: 500px) {
        height: 100%;
        width: 100%;
        border-radius: 0px;
    }
`

const ButtonDiv = styled.div`
    width: 30%;
    height: 60px;
    border-radius: 30px;
    background-color: #b8ccac;
`

const ConfirmButton = styled.button`
    height: 100%;
    width: 100%;
    background-color: transparent;
    border: none;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1.5rem;
    font-family: inherit;
`

const Code = styled.span`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1rem;
`

export default InvitePage;