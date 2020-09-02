import React, { useState } from "react"
import { useForm, appendErrors } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { useMutation, gql } from "@apollo/client"
import { navigate } from "gatsby"

import ls from "local-storage"
import { handleError } from "../utils"

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
        username
        jwtAuthExpiration
        isJwtAuthSecretRevoked
        premiumUser {
          premium
        }
      }
    }
  }
`

const Login = () => {
  const [formState, setFormState] = useState({})
  const { username, password } = formState
  const { register, handleSubmit, reset, errors } = useForm()

  const [mutateLogin] = useMutation(LOGIN, {
    variables: {
      id: uuidv4(),
      username,
      password,
    },
  })

  const login = async () => {
    const { data } = await mutateLogin()
    const {
      login: { authToken, clientMutationId, refreshToken, user },
    } = data
    ls.set("authToken", authToken)
    ls.set("mutationId", clientMutationId)
    ls.set("refreshToken", refreshToken)
    ls.set("user", user)
  }

  const onSubmit = async formData => {
    setFormState(formData)
    await login().catch(handleError)
    navigate("/dashboard/secret", { replace: true })
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
        {errors.username && "username is required"}

        <input
          type="password"
          name="password"
          placeholder="password"
          ref={register({ required: true })}
        />
        {errors.password && "password is required"}

        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default Login
