const parseDateToString = (value: string) => {
    const date = new Date(value)
    let parsedDate = ""

    let day = date.getDate()
    if (day < 10) {
        parsedDate = parsedDate + "0"
    }
    parsedDate = parsedDate + day.toString() + "."

    let month = date.getMonth()+1
    if (month < 10) {
        parsedDate = parsedDate + "0"
    }
    parsedDate = parsedDate + `${month.toString()}.${(date.getFullYear()).toString()}`

    return parsedDate
}

export { parseDateToString }