import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

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

const Login2 = () => {
  const [formState, setFormState] = useState({})
  const { username, password } = formState
  const { register, handleSubmit, reset } = useForm()

  const handleError = err => {
    console.log("oh noooo")
    console.log(err)
  }

  const [mutateLogin, { data, errors }] = useMutation(LOGIN, {
    variables: {
      id: uuidv4(),
      username,
      password,
    },
  })

  const login = async () => {
    const { data } = await mutateLogin()
    console.log("loginMutation", data)
    localStorage.setItem("logguedIn", JSON.stringify(data.login))
  }

  const onSubmit = formData => {
    setFormState(formData)
    console.log("formState", formState)
    login().catch(handleError)

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

export default Login2
