import { styled } from "styled-components";
import { dateToDay } from "../helpers/weekBuilding";
import AddPlan from "./AddPlan";
import { DeleteButton } from "./stocks/Stocks";
import { useNavigate } from "react-router-dom";

const PlannerDay = ({day, dayPlan, sendPlanServer, currentUser}) =>
{
    const navigate = useNavigate();

    const removePlan = (index) =>
    {
        dayPlan.splice(index, 1)

        sendPlanServer()
    }

    return (
        <DayContainer>
            <DateHeader>
                <DateCircle>{day.slice(0,5)}</DateCircle>
                <Day>{dateToDay(day)}</Day>
            </DateHeader>
            <PlanContainer>
                <TopPlanContainer>
                    {dayPlan.map((plan, index) => {return (
                        <DayItem key={plan.recipe}>
                            <SeparateDiv>
                                <Moment>{plan.moment}:</Moment>
                                <Name>{plan.recipe}</Name>
                            </SeparateDiv>
                            <SeparateDiv>
                                {plan.recipeId && <PlanButton onClick={() => {navigate(`/recipes/${plan.recipeId}`)}}>Go to recipe</PlanButton>}
                                <PlanButton onClick={() => removePlan(index)}>Remove</PlanButton>
                            </SeparateDiv>
                        </DayItem>
                    )})}
                </TopPlanContainer>
                <AddPlan sendPlanServer={sendPlanServer} dayPlan={dayPlan} currentUser={currentUser} />
            </PlanContainer>
        </DayContainer>
    )
}

const DayContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DateHeader = styled.div`
    width: 90%;
    height: 60px;
    border-radius: 30px;
    background-color: rgba(209,207,198,0.6);
    display: flex;
    align-items: center;

    @media only screen and (max-width: 850px) {
        height: 50px
    }

    @media only screen and (max-width: 500px) {
        height: 40px;
    }
`

const DateCircle = styled.div`
    height: 85%;
    aspect-ratio: 1;
    border-radius: 50%;
    font-weight: 500;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin-left: 5px;
    color: rgba(209,207,198,0.8);
`

const Day = styled.div`
    margin-left: 15px;
    color: white;
    font-weight: normal;
    font-size: 1.3rem;
`

const PlanContainer = styled.div`
    width: 90%;
    margin-top: 10px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const TopPlanContainer = styled.ul`
    min-height: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const DayItem = styled.li`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    border-radius: 20px;

    &:hover {
        background-color: rgba(209,207,198,0.3);
    }
`

export const SeparateDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const Moment = styled.span`
    font-weight: 500;
    font-size: 1.1rem !important;
`

export const Name = styled.span`
    font-weight: lighter;
    font-size: 1.3rem;
`

export const PlanButton = styled(DeleteButton)`
    ${DayItem}:hover & {
        visibility: visible;
    }
`

export default PlannerDay;