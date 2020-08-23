export const getLs = item => JSON.parse(localStorage.getItem(item))
export const setLs = (item, value) =>
  localStorage.setItem(item, JSON.stringify(value))

export const logguedIn = getLs("logguedIn")
export const authToken = getLs("authToken")
