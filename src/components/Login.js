import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import ls from "local-storage"

const LOGIN = gql`
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
        jwtAuthExpiration
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
  const [formState, setFormState] = useState({})
  const { username, password } = formState
  const { register, handleSubmit, reset } = useForm()

  const handleError = err => {
    console.log("oh noooo something went wrong!!!! 💩")
    console.log(err)
  }

  const [mutateLogin] = useMutation(LOGIN, {
    variables: {
      id: uuidv4(),
      username,
      password,
    },
  })

  const [mutateRefreshToken] = useMutation(REFRESH_TOKEN)

  const login = async () => {
    const { data } = await mutateLogin()
    console.log("data", data)
    const {
      login: { authToken, clientMutationId, refreshToken, user },
    } = data
    ls.set("authToken", authToken)
    ls.set("mutationId", clientMutationId)
    ls.set("refreshToken", refreshToken)
    ls.set("user", user)
  }

  const refreshTokenFn = async (token, id) => {
    const { data } = await mutateRefreshToken({
      variables: {
        token,
        id,
      },
    })

    ls.set("authToken", data.refreshJwtAuthToken.authToken)
  }

  const onSubmit = async formData => {
    setFormState(formData)
    await login().catch(handleError)
    // const logguedIn = ls("logguedIn")
    // const { refreshToken, clientMutationId } = logguedIn
    // refreshTokenFn(refreshToken, clientMutationId).catch(handleError)
    reset()
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
