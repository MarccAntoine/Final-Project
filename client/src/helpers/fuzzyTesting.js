const {initialItems} = require('./MainItemsDatabase')

let matchingNames = [];
let exactMatch = null


//This whole document contains functions testing wether a string is equal to another, if its part of another or if its simimlar to another
// Ket, Ketchop and Ketchup would all return ketchup, and maybe other similar words in the array.
function jaccardIndex(s1, s2) {
    const set1 = new Set(s1);
    const set2 = new Set(s2);
    
    const intersection = new Set([...set1].filter(item => set2.has(item)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
}

function fuzzyMatch(query, target) {
    query = query.toLowerCase();
    let targetName = target.name.toLowerCase();

    const similarity = jaccardIndex(query, targetName);
    
    // Set a threshold for a match
    const similarityThreshold = 0.7;
    
    if (similarity >= similarityThreshold) 
    {
        if (matchingNames.includes(target)) {return}
        matchingNames.push(target)
    }
}

function exactTesting(query, target) {
    if (matchingNames.includes(target)) {return}
    query = query.toLowerCase();
    let targetName = target.name.toLowerCase();

    if (query === targetName) {exactMatch = {...target, match: "exact"}}
    if (targetName.includes(query)) {matchingNames.push(target)}
}

export const itemSearch = (input, array) => {
    exactMatch = null;
    matchingNames = [];
    const query = input;

    if (array === "initialItems") {array = initialItems}

    array.forEach((item) => {exactTesting(query, item)})

    if (exactMatch === null) {array.forEach((item) => {fuzzyMatch(query, item)})}

    return {exactMatch, matchingNames}
}

