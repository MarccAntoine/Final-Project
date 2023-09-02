import { styled } from "styled-components";
import { dateToDay } from "../helpers/weekBuilding";
import AddPlan from "./AddPlan";

const PlannerDay = ({day, dayPlan, sendPlanServer, currentUser}) =>
{
    return (
        <DayContainer>
            <DateHeader>
                <DateCircle>{day.slice(0,5)}</DateCircle>
                <Day>{dateToDay(day)}</Day>
            </DateHeader>
            <PlanContainer>
                <TopPlanContainer>
                    {dayPlan.map((plan) => {return (
                        <DayItem key={plan.recipe}>
                            <Moment>{plan.moment}:</Moment>
                            <Name>{plan.recipe}</Name>
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
`

const DateCircle = styled.div`
    height: 85%;
    aspect-ratio: 1;
    border-radius: 50%;
    font-weight: 500;
    font-size: 16px;
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
    font-size: 32px;
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

const DayItem = styled.li`
    padding: 10px 20px;
    display: flex;
    gap: 20px;
    align-items: center;
    width: 80%;
    border-radius: 20px;

    &:hover {
        background-color: rgba(209,207,198,0.3);
    }
`

const Moment = styled.span`
    font-weight: 500;
    font-size: 17px;
`

const Name = styled.span`
    font-weight: lighter;
    font-size: 20px;
`

export default PlannerDay;