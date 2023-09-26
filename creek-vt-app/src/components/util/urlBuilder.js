export function urlBuilder(str) {
  // let nameArray = str.trim().toLowerCase().split(" ")
  // let newString = nameArray.join("-")
  // return newString
  if (str.includes(",")) {
    return str.toLowerCase().replaceAll(",", "").replaceAll(" ", "-");
  } else {
    return str.toLowerCase().replaceAll(" ", "-");
  }
}

export default urlBuilder;
