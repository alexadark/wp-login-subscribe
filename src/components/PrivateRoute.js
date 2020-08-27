import React from "react"
import { navigate } from "gatsby"
import ls from "local-storage"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const user = ls("user")
  if (!user && location.pathName !== "/dashboard/login") {
    navigate("/dashboard/login", { replace: true })
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute
