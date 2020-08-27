import React from "react"
import { navigate } from "gatsby"
import ls from "local-storage"
import Login from "./Login"
import SignUp from "./SignUp"

const RouteLogin = () => {
  const user = ls("user")
  if (user) {
    navigate("/dashboard/secret", { replace: true })
  }
  return (
    <div>
      <h1>Login or Signup</h1>
      <Login />
      <SignUp />
    </div>
  )
}

export default RouteLogin
