/** @jsx jsx */
import { jsx, Flex, Button } from "theme-ui"
import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import Login from "./Login"
import SignUp from "./SignUp"
import { Layer } from "grommet"
import ls from "local-storage"

const UserNav = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const user = ls("user")
  const [logguedIn, setLogguedIn] = useState(user)
  const logout = () => {
    ls.clear()
    setLogguedIn(false)
    navigate("/", { replace: true })
  }
  const closeLogin = () => setShowLogin(false)
  const closeSignup = () => setShowSignup(false)
  const openSignup = () => setShowSignup(true)
  const openLogin = () => setShowLogin(true)

  return (
    <>
      <Flex as="nav">
        {logguedIn ? (
          <>
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
            <Link to="/dashboard/secret">dashboard</Link>
            <h4>Loggued in as {user.username}</h4>
          </>
        ) : (
          <>
            <Button onClick={openLogin}>Login</Button>
            <Button onClick={openSignup}>Signup</Button>
          </>
        )}
      </Flex>
      {showLogin && (
        <Layer onEsc={closeLogin} onClickOutside={closeLogin}>
          <Button label="close" onClick={closeLogin} />
          <Login />
        </Layer>
      )}
      {showSignup && (
        <Layer onEsc={closeSignup} onClickOutside={closeSignup}>
          <Button label="close" onClick={closeSignup} />
          <SignUp />
        </Layer>
      )}
    </>
  )
}

export default UserNav
