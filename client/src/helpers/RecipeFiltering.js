export const recipeFilter = (recipes, stocks, filter) =>
{
    if (filter === "alpha")
    {
        return recipes.sort((a,b) =>
        {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if (nameA < nameB) {return -1}
            else if (nameA > nameB) {return 1}
            else {return 0}
        })
    }
    else 
    {
        const stocksName = new Set(stocks.map((stock) => {return stock.product.toLowerCase()}))

        return recipes.sort((a, b) =>
        {
            const stockA = (a.ingredients.filter((ingre) => stocksName.has(ingre.product.toLowerCase())).length) * 100 / (a.ingredients.length)
            const stockB = (b.ingredients.filter((ingre) => stocksName.has(ingre.product.toLowerCase())).length) * 100 / (b.ingredients.length)

            if (stockA > stockB) {return -1}
            else if (stockA < stockB) {return 1}
            else {return 0}
        })
    }
}

export const howManyInStock = (recipe, stocks) =>
{
    const stocksName = new Set(stocks.map((stock) => {return stock.product.toLowerCase()}))

    return (recipe.ingredients.filter((ingre) => stocksName.has(ingre.product.toLowerCase())).length)
}