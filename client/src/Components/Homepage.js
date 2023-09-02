import { styled } from "styled-components"
import Loading from "./Loading"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { KitchenContext } from "./KitchenContext"
import moment from "moment"
import { dateTesting, dateTestingDay } from "../helpers/dateTesting"
import { DayItem, Name, SeparateDiv, Moment, PlanButton } from "./PlannerDay"

const Homepage = () =>
{
    const {currentUser, status} = useContext(KitchenContext);
    const currentDate = moment().format("dddd, MMMM do")
    const [isLoading, setIsLoading] = useState(true);
    const [expiring, setExpiring] = useState([])
    const [dayPlan, setDayPlan] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser === null && status !== "loading") 
        {
            navigate('/profile/setup')
        }
    }, [currentUser])

    const setDayPlanner = (planner) =>
    {
    if (planner !== [])
        {
            const datesToTest = [...Object.keys(planner[0]), ...Object.keys(planner[1])]
            const today = datesToTest.filter((date) => dateTestingDay(date))
            setDayPlan(planner[0][today[0]] || planner[1][today[0]])
        }
    }

    useEffect(() =>
    {
        if (currentUser)
        {
            setExpiring(currentUser.items.filter((item) => dateTesting(item?.expiration)))
            fetch(`/api/planner/${currentUser._id}`)
            .then(res => res.json())
            .then((data) => {
                if(data.status === 400 || data.status === 500) {
                    throw new Error(data.message);
                }
                else {
                    setDayPlanner(data.data.planner);
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [currentUser])

    return (
        <>
        {isLoading ? (<Loading />) : (
                <Container>
                <ContentContainer>
                    <SectionContainer>
                        <Welcome>Welcome back, {currentUser.name}!</Welcome>
                    </SectionContainer>
                    <SectionContainer>
                        <PlanningTitle>Your planner for {currentDate}:</PlanningTitle>
                        <SubContentDiv>
                            {dayPlan.length === 0 ? (<h3>You don't have any meal planned for today.</h3>) : (
                            dayPlan.map((plan, index) => {return (
                                <DayItem key={plan.recipe}>
                                    <SeparateDiv>
                                        <Moment>{plan.moment}:</Moment>
                                        <Name>{plan.recipe}</Name>
                                    </SeparateDiv>
                                    <SeparateDiv>
                                        {plan.recipeId && <PlanButton onClick={() => {navigate(`/recipes/${plan.recipeId}`)}}>Go to recipe</PlanButton>}
                                    </SeparateDiv>
                                </DayItem>
                            )}))}
                        </SubContentDiv>
                    </SectionContainer>
                    <SectionContainer>
                        <StocksTitle>Your products expiring soon:</StocksTitle>
                        <SubContentDiv>
                            {expiring.length === 0 ? (<h3>You don't have any products expiring soon.</h3>) : (
                                expiring.map((item, index) => {return (
                                    <DayItem key={index}>
                                        <SeparateDiv>
                                            <Name>{item.product}</Name>
                                            <Moment style={{fontSize: "15px"}}> - {item.category}</Moment>
                                        </SeparateDiv>
                                        <SeparateDiv>
                                            <Moment>{item.expiration}</Moment>
                                        </SeparateDiv>
                                    </DayItem>
                                )})
                            )}
                        </SubContentDiv>
                    </SectionContainer>
                </ContentContainer>
            </Container>
        )}

    </>
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
    justify-content: flex-start;
    gap: 5px;
    position: relative;
    overflow: hidden;
    margin-top: 5vh;


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

const SectionContainer = styled.div`
    min-height: 25%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Welcome = styled.div`
    font-size: 45px;
    font-weight: bold;
    padding: 20px;
    border-radius: 25px;
    color: black;
`

const PlanningTitle = styled.div`
    font-weight: lighter;
    font-size: 30px;
    padding: 10px 30px;
    background-color: rgba(209,207,198,0.6);
    border-radius: 25px;
    color: white;
`

const SubContentDiv = styled.ul`
    margin-top: 20px;
    min-height: 65%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    h3 {
        font-weight: lighter;
        font-size: 20px;
    }
`


const StocksTitle = styled.div`
    font-weight: lighter;
    font-size: 30px;
    padding: 10px 30px;
    background-color: rgba(212, 122, 115, 0.7);
    border-radius: 25px;
    color: white;
`




export default Homepage;