import React from "react"
import { navigate } from "gatsby"
import { logguedIn } from "./utils"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!logguedIn && location.pathName !== "/dashboard/login") {
    navigate("/dashboard/login", { replace: true })
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute
