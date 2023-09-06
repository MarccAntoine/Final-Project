const moment = require('moment');

//Those functions are used in the planner, to build weeks and to test that its the good weeks in the planner. 
const getWeekRange = (startDate) => 
{
    const startOfWeek = startDate.clone().startOf('week').startOf('day');
    const endOfWeek = startDate.clone().endOf('week').startOf('day');
    const days = {};

    for (let date = startOfWeek.clone(); date.isSameOrBefore(endOfWeek); date.add(1, 'day')) {
        days[date.format('MM/DD/YY')] = [];
    }

    return days;
}

export const getCurrentWeek = () =>
{
    const currentDate = moment();
    const currentWeek = getWeekRange(currentDate);

    return currentWeek
}

export const getNextWeek = () =>
{
    const currentDate = moment();
    const nextWeekStartDate = currentDate.clone().add(1, 'week');
    const nextWeek = getWeekRange(nextWeekStartDate);

    return nextWeek
}

export const whenIsDate = (dateToTest) =>
{
    const testDate = moment(dateToTest, 'MM/DD/YY')
    const currentDate = moment();
    const startOfWeek = currentDate.clone().startOf('week').startOf('day');
    const endOfWeek = currentDate.clone().endOf('week').startOf('day');

    if (testDate.isSameOrAfter(startOfWeek) && testDate.isSameOrBefore(endOfWeek))  {return "current"}
    else if (testDate.isBefore(startOfWeek)) {return "last"}
    else if (testDate.isAfter(endOfWeek)) {return "next"}
}

//This function converts a date to a day. Ex. march 20th to monday
export const dateToDay = (date) =>
{
    const dateToConvert = moment(date, 'MM/DD/YY');
    return (dateToConvert.format('dddd'))
}
