import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import Cookies from "js-cookies"

const LOGIN_USER = gql`
  mutation loginMutation($username: String!, $password: String!, $id: String!) {
    login(
      input: { clientMutationId: $id, username: $username, password: $password }
    ) {
      authToken
      clientMutationId
      refreshToken
      user {
        id
        name
        firstName

        # premiumUser {
        #   premium
        # }
      }
    }
  }
`

const REFRESH_TOKEN = gql`
  mutation refreshToken($id: String!, $token: String!) {
    refreshJwtAuthToken(
      input: { clientMutationId: $id, jwtRefreshToken: $token }
    ) {
      authToken
      clientMutationId
    }
  }
`

const Login = () => {
  const [state, setState] = useState({})
  const { register, handleSubmit, reset } = useForm()

  const [sendLoginData] = useMutation(LOGIN_USER, {
    variables: {
      id: uuidv4(),
      username: state.username,
      password: state.password,
    },
  })
  //put the data from the login in the state
  const [loginData, setLoginData] = useState()
  const [error, setError] = useState()

  const [logguedIn, setLogguedIn] = useState()

  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN, {
    variables: {
      token: loginData && loginData.login.refreshToken,
      id: loginData && loginData.login.clientMutationId,
    },
  })

  const [refreshedToken, setRefreshedToken] = useState()

  // useEffect(() => {
  //   if (loginData) {
  //     localStorage.setItem("logguedIn", JSON.stringify(loginData.login))
  //     const mutate = async () => {
  //       refreshTokenMutation()
  //       try {
  //         const { data } = await refreshTokenMutation()
  //         setRefreshedToken(data)
  //         console.log("refreshed")
  //       } catch (error) {
  //         setError(error)
  //       }
  //     }
  //     mutate()
  //   }
  //   // loginData && Cookies.set("loginData", JSON.stringify(loginData.login))
  // }, [loginData])

  // useEffect(() => {
  //   if (refreshedToken) {
  //     localStorage.setItem(
  //       "authToken",
  //       JSON.stringify(refreshedToken.refreshJwtAuthToken.authToken)
  //     )
  //   }
  // }, [refreshedToken])

  const refreshToken = async () => {
    try {
      const { data } = await refreshTokenMutation()
      await setRefreshedToken(data)
    } catch (error) {
      setError(error)
    }
  }

  const onSubmit = async formData => {
    console.log("// TEST 1- Submit! data: ", formData)
    setState(formData)
    console.log("// TEST 1 - state: ", state)
    try {
      const { data } = await sendLoginData()
      console.log("// TEST 1 - login Data: ", data)
      await setLoginData(data)
      localStorage.setItem("logguedIn", JSON.stringify(loginData.login))
      try {
        const { data } = await refreshTokenMutation()
        await setRefreshedToken(data)
        console.log("// TEST 1 - refreshed: ", refreshedToken)
        localStorage.setItem(
          "authToken",
          JSON.stringify(refreshedToken.refreshJwtAuthToken.authToken)
        )
      } catch (error) {
        setError(error)
      }
      reset()
    } catch (error) {
      setError(error)
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="username"
          placeholder="username"
          ref={register({ required: true })}
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          ref={register({ required: true })}
        />

        <input type="submit" value="submit" />
      </form>
    </div>
  )
}
export default Login
