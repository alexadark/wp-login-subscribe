import React from "react"
import { logguedIn } from "./utils"

const RouteSecret = () => {
  const { user } = logguedIn
  return (
    <div>
      <h1>Welcome {user.firstName}, this is your secret dashboard</h1>
    </div>
  )
}

export default RouteSecret
