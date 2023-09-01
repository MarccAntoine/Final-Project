import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import { KitchenContext } from "./KitchenContext";
import { dateToDay, getCurrentWeek, getNextWeek, whenIsDate } from "../helpers/weekBuilding";
import { styled } from "styled-components";


const Planner = () =>
{
    const [planner, setPlanner] = useState([])
    const [weeks, setWeeks] = useState({"current": {}, "next" : {}})
    const [isLoading, setIsLoading] = useState(true)
    const [selectedWeek, setSelectedWeek] = useState("current")
    const {currentUser} = useContext(KitchenContext)

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
                    setPlanner(data.data);
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [currentUser])

    useEffect(() =>
    {
        if (planner[0] === 'null')
        {
            setWeeks({"current" : getCurrentWeek(), "next" : getNextWeek()})
        }
        else if (planner !== [])
        {
            for (let week of planner)
            {
                let result = whenIsDate(Object.keys(week)[0])

                if (result === "current") {setWeeks({...weeks, "current" : week})}
                else if (result === "next") {setWeeks({...weeks, "next" : week})}
                else 
                {
                    setWeeks({...weeks, "next" : getNextWeek()});
                }
            }
        }
    }, [planner])

    console.log(weeks.current)

    return (
        <>
            {isLoading ? (<Loading></Loading>) : (
                <Container>
                    <ContentContainer>
                        <TopContainer>
                            <DayContainer>
                                <DateHeader>
                                    <DateCircle>{Object.keys(weeks.current)[0].slice(0,5)}</DateCircle>
                                    <Day>{dateToDay(Object.keys(weeks.current)[0])}</Day>
                                </DateHeader>
                                <PlanContainer>

                                </PlanContainer>
                            </DayContainer>
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
`

const ContentContainer = styled.div`
    height: 85%;
    width: 90%;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    font-size: 20px;
    font-weight: lighter;

    &:hover {
        background-color: rgba(209,207,198,1);
        cursor: pointer;
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
    justify-content: center;
    gap: 5%;
    overflow: hidden;
`

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

const PlanContainer = styled.ul`

`

export default Planner;