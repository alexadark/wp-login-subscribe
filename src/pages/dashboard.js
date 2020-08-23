import React, { useEffect } from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import RouteSecret from "../components/RouteSecret"
import RouteLogin from "../components/RouteLogin"
import PrivateRoute from "../components/PrivateRoute"
import { navigate } from "gatsby"

const Dashboard = ({ location }) => {
  useEffect(() => {
    if (location.pathname.match(/^\/dashboard\/?$/)) {
      navigate("/dashboard/login", { replace: true })
    }
  }, [])

  return (
    <Layout>
      <Router>
        <PrivateRoute path="/dashboard/secret" component={RouteSecret} />
        <RouteLogin path="/dashboard/login" />
      </Router>
      <h1>this is the dashboard</h1>
    </Layout>
  )
}

export default Dashboard
