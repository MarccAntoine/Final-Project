import moment from "moment";

export const dateTesting = (expDate) =>
{
    const dateToTest = moment(expDate, 'MM/DD/YY')

    const today = moment()

    const distanceBetween = dateToTest.diff(today, 'days')

    if (distanceBetween <= 3) {return true}
    else {return false}
}