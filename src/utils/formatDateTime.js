//formattingTime for display with Current Conditions section

export function formatDateTime(inputTime) {
    inputTime = new Date(inputTime)
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    let dow = weekdays[inputTime.getDay()];
    let monthString = months[inputTime.getMonth()]
    let day = inputTime.getDate();
    if (day < 10) { day = "0" + day.toString() }
    let month = inputTime.getMonth();
    month++
    if (month < 10) { month = "0" + month.toString() }
    let year = inputTime.getFullYear();
    let hour24 = inputTime.getHours();
    let hour = hour24;
    let amPM = "am";
    if (hour24 == 12) { amPM = "pm" }
    if (hour24 > 12) { hour = hour24 - 12; amPM = "pm" }
    let minute = inputTime.getMinutes();
    if (minute < 10) { minute = "0" + minute.toString() }
    return (
        {
            dow: dow,
            month: month,
            monthString: monthString,
            day: day,
            year: year,
            date: `${month}/${day}`,
            time: `${hour}:${minute}`,
            time24Hr: `${hour24}:${minute}`,
            amPm: amPM,
            htmlDateTime: `${year}-${month}-${day}T${hour24}:${minute}`,
            inputTime: inputTime
        }
    )
}

export function convertTime (inputTime) {
    let date = new Date();
    date.setHours(inputTime.slice(0,2))
    date.setMinutes(inputTime.slice(3,5))
    let outputTime = `${formatDateTime(date).time} ${formatDateTime(date).amPm}`
    return outputTime;
}