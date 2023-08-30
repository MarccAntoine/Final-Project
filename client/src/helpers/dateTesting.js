import moment from "moment";

export const dateTesting = (expDate) =>
{
    const dateToTest = moment(expDate, 'MM/DD/YY')

    const today = moment()

    const distanceBetween = dateToTest.diff(today, 'days')

    const isInPast = dateToTest.isBefore(today)

    if (distanceBetween <= 3 || isInPast) {return true}
    else {return false}
}

