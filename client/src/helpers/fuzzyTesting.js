let matchingNames = [];
let exactMatch = null
const {initialItems} = require('./MainItemsDatabase')

function jaccardIndex(s1, s2) {
    const set1 = new Set(s1);
    const set2 = new Set(s2);
    
    const intersection = new Set([...set1].filter(item => set2.has(item)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
}

function fuzzyMatch(query, target) {
    query = query.toLowerCase();
    targetName = target.name.toLowerCase();

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
    query = query.toLowerCase();
    targetName = target.name.toLowerCase();

    if (query === targetName) {exactMatch = {...target, match: "exact"}}
    if (targetName.includes(query)) {matchingNames.push(target)}
}

const query = "worsceteshire";

initialItems.forEach((item) => {exactTesting(query, item)})

if (exactMatch === null) {initialItems.forEach((item) => {fuzzyMatch(query, item)})}

console.log(exactMatch || matchingNames);