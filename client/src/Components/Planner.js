import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import { KitchenContext } from "./KitchenContext";
import { getCurrentWeek, getNextWeek, whenIsDate } from "../helpers/weekBuilding";
import { styled } from "styled-components";
import PlannerDay from "./PlannerDay";
import { useNavigate } from "react-router-dom";


const Planner = () =>
{
    const [weeks, setWeeks] = useState({"current": {}, "next" : {}, "_id" : ""})
    const [isLoading, setIsLoading] = useState(true)
    const [selectedWeek, setSelectedWeek] = useState("current")
    const {currentUser, triggerModification, setTriggerModification} = useContext(KitchenContext)
    const navigate = useNavigate();

    const setWeeksPlanner = (planner) =>
    {
        let current, next;
        if (planner.length <= 1)
        {
            setWeeks({"current" : getCurrentWeek(), "next" : getNextWeek(), "_id" : planner[0]})
        }
        else if (planner !== [])
        {
            for (let week of planner.planner)
            {
                let result = whenIsDate(Object.keys(week)[0])

                if (result === "current") {current = week}
                else if (result === "next") {next = week}
                else 
                {
                    next = getNextWeek();
                }
            }
            setWeeks({"current" : current, "next" : next, "_id" : planner._id})
        }
    }

    useEffect(() =>
    {
        if (currentUser)
        {
            fetch(`/api/planner/${currentUser._id}`)
            .then(res => res.json())
            .then((data) => {
                if(data.status === 400 || data.status === 500) {
                    throw new Error(data.message);
                }
                else {
                    setWeeksPlanner(data.data);
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [currentUser])

    const sendPlanServer = () =>
    {
        fetch("/api/planner/add", {
            method: "POST",
            body: JSON.stringify({"plannerData" : weeks}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            })
            .then((res) => res.json())
            .then((json) => {
                setTriggerModification(triggerModification + 1)
                const { status } = json;
                if (status === 200) {
                } else {
                navigate("/error")
                }
            });
    }

    return (
        <>
            {isLoading ? (<Loading></Loading>) : (
                <Container>
                    <ContentContainer>
                        <TopContainer>
                            {Object.keys(weeks[selectedWeek]).map((day) => {
                                return <PlannerDay key={day} day={day} dayPlan={weeks[selectedWeek][day]} sendPlanServer={sendPlanServer} currentUser={currentUser}/>
                            })}
                        </TopContainer>
                        <ButtonsContainer>
                            {selectedWeek === "current" ? (<CurrentButtonSelected onClick={() => setSelectedWeek("current")}>Current Week</CurrentButtonSelected>) : (<CurrentButton onClick={() => setSelectedWeek("current")}>Current Week</CurrentButton>)}
                            {selectedWeek === "next" ? (<CurrentButtonSelected onClick={() => setSelectedWeek("next")}>Next Week</CurrentButtonSelected>) : (<CurrentButton onClick={() => setSelectedWeek("next")}>Next Week</CurrentButton>)}
                        </ButtonsContainer>
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
    position: relative;
    padding: 20px;

    @media only screen and (max-width: 500px) {
        padding-top: 70px;
    }
`

const ContentContainer = styled.div`
    height: 85%;
    width: 90%;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
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

const ButtonsContainer =  styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5%;
    width: 100%;
    height: 10%;
`

const CurrentButton = styled.button`
    border: none;
    border-radius: 15px;
    width: 15%;
    height: 80%;
    background-color: rgba(209,207,198,0.6);
    font-family: inherit;
    font-size: 1.4rem;
    font-weight: lighter;

    &:hover {
        background-color: rgba(209,207,198,1);
        cursor: pointer;
    }

    @media only screen and (max-width: 850px) {
        width: 20%;
    }

    @media only screen and (max-width: 500px) {
        width: 25%;
    }
`

const CurrentButtonSelected = styled(CurrentButton)`
    background-color: rgba(209,207,198,1);
`

const TopContainer = styled.div`
    height: 90%;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 2%;
    overflow: scroll;
`

export default Planner;