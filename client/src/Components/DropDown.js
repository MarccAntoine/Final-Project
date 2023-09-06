import { useRef, useState } from "react";
import { styled } from "styled-components";
import { itemSearch } from "../helpers/fuzzyTesting";

const DropDown = ({setFormData, formData, location, recipes}) =>
{
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [similar, setSimilar] = useState([])
    const ulRef = useRef(null)

    const setSuggestion = (item) =>
    {
        if (location === "product")
        {
            setFormData({...formData, "product": item.name, "category": item.category})
            setSimilar([]);
        }
        else
        {
            setFormData({...formData, "recipe": item.name, "recipeId": item._id})
            setSimilar([]);
        }
    }

    const keyEvent = (ev) =>
    {
        if (ev.key === "ArrowUp" && selectedIndex > 0)
        {
            ev.preventDefault();
            setSelectedIndex(selectedIndex - 1)
            ulRef.current.scrollTop -= 30;
        }
        else if (ev.key === "ArrowDown" && selectedIndex < similar.length - 1)
        {
            ev.preventDefault();
            setSelectedIndex(selectedIndex + 1)
            ulRef.current.scrollTop += 30;
        }
        else if (ev.key === "Enter" && selectedIndex >= 0)
        {
            ev.preventDefault();
            setSuggestion(similar[selectedIndex])
            setSelectedIndex(-1)
        }
    }

    const handleChange = (ev) =>
    {
        let input = ev.target.value
        let result = itemSearch(input, (recipes || "initialItems"))
        if (input.length >= 2) {setSimilar(result.matchingNames)}
        else {setSimilar([])}
        input = input.replace(/\b\w/g, (match) => match.toUpperCase());
        setFormData({...formData, [ev.target.id]: input})
        setSelectedIndex(-1)
    }

    return (
        <>
            <label htmlFor={location} >{location} Name</label>
            <ItemInput autoComplete="off" id={location} value={location === "product" ? (formData.product) : (formData.recipe)} placeholder={location} onKeyDown={keyEvent} onChange={handleChange} onBlur={() => setTimeout(() => {setSimilar([])}, 100)}></ItemInput>
            {similar.length !== 0 ? (
            <ItemSuggestions ref={ulRef}>
                <SuggestionTitle>Suggestions:</SuggestionTitle>
                {similar && similar.map((item, index) => {return (
                <SuggestionButton onClick={() => {setSuggestion(item)}} id={location} value={item.name} key={item.name}>
                    {selectedIndex === index ? (<SelectedSuggestion>{item.name}<SuggestionCat> - {item.category || item.time}</SuggestionCat></SelectedSuggestion>) : (<Suggestion>{item.name}<SuggestionCat> - {item.category || item.time}</SuggestionCat></Suggestion>)} 
                </SuggestionButton>)})}
            </ItemSuggestions>) : (<></>)}
        </>
    )
}

const ItemInput = styled.input`
    border: none;
    background-color: rgba(255, 255, 255, 0.3);
    color: inherit;
    height: 100%;
    width: 96%;
    border-radius: 10px;
    font-size: 0.9rem;
    padding: 0px 5px;
    text-align: center;
    position: relative;
    z-index: 50;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        outline: none;
    }
`

const ItemSuggestions = styled.ul`
    width: 100%;
    max-height: 270%;
    overflow: scroll;
    padding: 10px;
    position: absolute;
    top: 100%;
    left: 2%;
    background-color: #b8ccac;
    z-index: 40;
    border-radius: 0px 0px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
    font-family: inherit;
    color: inherit;
`

const SuggestionButton = styled.button`
    width: 95%;
    height: 30px;
    background-color: transparent;
    border: none;
    color: inherit;

    &:hover {
        cursor: pointer;
    }
`

const SuggestionTitle = styled.h5`
    font-size: 0.7rem;
    font-weight: bold;
    margin-bottom: 5px;
`

const Suggestion = styled.li`
    width: 100%;
    height: 100%;
    font-size: 0.9rem;
    text-align: left;
    color: inherit;
    font-weight: 300;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 4px;
    white-space: nowrap;
    gap: 5px;

    &:hover {
        background-color: rgba(255,255,255,0.2);
    }

    @media only screen and (max-width: 500px) {
        font-size: 0.6rem;
    }
`

const SelectedSuggestion = styled(Suggestion)`
    background-color: rgba(255,255,255,0.2);
`

const SuggestionCat = styled.span`
    font-weight: 100;
    font-size: 0.8rem;
    color: inherit;
    white-space: nowrap;

    @media only screen and (max-width: 500px) {
        font-size: 0.6rem;
    }
`

export default DropDown;