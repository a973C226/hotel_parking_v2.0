const monthDict = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сетября",
    "октября",
    "ноября",
    "декабря"
]

const dateParse = (date: string) => {
    const [day, month, year, _] = date.split(" ");
    return `${year}-${monthDict.indexOf(month)+1}-${day}`;
}

export { dateParse }