import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { KitchenContext } from "./KitchenContext";
import { styled } from "styled-components";


const Profile = () =>
{
    const { user, isAuthenticated } = useAuth0();
    const {currentUser} = useContext(KitchenContext)

    return (
        typeof currentUser === "object" && (
                <Container>
                    <ContentContainer>
                        <ImageContainer><Image src={user.picture} alt="Profile Picture" /></ImageContainer>
                        <h1>{currentUser.name}</h1>
                        <h3>Email: {user.email}</h3>
                    </ContentContainer>
                </Container>
                )
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #F8F6EF;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ContentContainer = styled.div`
    height: 85%;
    width: 85%;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;
    position: relative;
    overflow: hidden;
    margin-top: 5vh;

    h1 {
        font-weight: 500;
        font-size: 60px;
    }

    h3 {
        font-weight: lighter;
        font-size: 30px;
    }


    @media only screen and (max-width: 650px) {
        height: 90%;
        width: 90%;

        h1 {
        font-weight: 500;
        font-size: 40px;
    }

    h3 {
        font-weight: lighter;
        font-size: 20px;
    }
    }

    @media only screen and (max-width: 500px) {
        height: 100%;
        width: 100%;
        border-radius: 0px;

        h1 {
        font-weight: 500;
        font-size: 35px;
        }

        h3 {
            font-weight: lighter;
            font-size: 20px;
        }
    }
`

const ImageContainer = styled.div`
    width: 15%;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;

    @media only screen and (max-width: 650px) {
        width: 40%;
    }
`

const Image = styled.img`
    width: 100%;
    height: 100%;
`

export default Profile;