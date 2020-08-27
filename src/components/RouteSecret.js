import React from "react"
import CreatePage from "./CreatePage"
import ls from "local-storage"

const RouteSecret = () => {
  const user = ls("user")
  return (
    <>
      <h1>welcome {user.firstName}</h1>
      <CreatePage />
    </>
  )
}

export default RouteSecret
