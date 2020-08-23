export const getLsItem = item => JSON.parse(localStorage.getItem(item))

export const logguedIn = getLsItem("logguedIn")
export const authToken = getLsItem("authToken")
