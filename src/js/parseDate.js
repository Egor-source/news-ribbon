const parseDate = (date) => {
    let dt = new Date(date);
    let day = dt.getDate();
    let month = dt.getMonth() + 1;
    let year = dt.getFullYear();
    return `${Math.trunc(day / 10) > 0 ? day : `0${day}`}.${Math.trunc(month / 10) > 0 ? month : `0${month}`}.${year}`
}

export default parseDate