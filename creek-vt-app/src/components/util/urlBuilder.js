export function urlBuilder(str) {
    // let nameArray = str.trim().toLowerCase().split(" ")
    // let newString = nameArray.join("-")
    // return newString
    return str.toLowerCase().replaceAll(" ", "-")
}