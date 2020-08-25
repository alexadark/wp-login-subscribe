export const handleError = err => {
  console.log(`oh noooo something went wrong!!!! 💩`)
  console.log(err)
}

export const isTokenAlive = expDate => {
  const now = Date.now().valueOf() / 1000
  return typeof expDate !== "undefined" && expDate > now
}
