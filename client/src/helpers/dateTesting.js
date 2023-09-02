import moment from "moment";

export const dateTesting = (expDate) =>
{
    const dateToTest = moment(expDate, 'MM/DD/YY')

    const today = moment()

    const distanceBetween = dateToTest.diff(today, 'days')

    const isInPast = dateToTest.isBefore(today)

    if (distanceBetween <= 2 || isInPast) {return true}
    else {return false}
}

export const dateTestingDay = (expDate) =>
{
    const dateToTest = moment(expDate, 'MM/DD/YY')

    const today = moment().format('MM/DD/YY')

    const distanceBetween = dateToTest.isSame(today, 'MM/DD,YY')

    if (distanceBetween) {return true}
    else {return false}
}

