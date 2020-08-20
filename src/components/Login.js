import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const LOGIN_USER = gql`
  mutation loginMutation($username: String!, $password: String!, $id: String!) {
    login(
      input: { clientMutationId: $id, username: $username, password: $password }
    ) {
      authToken
      user {
        id
        name
      }
    }
  }
`

const Login = () => {
  const [state, setState] = useState({})
  const { register, handleSubmit } = useForm()

  const [sendLoginData] = useMutation(LOGIN_USER, {
    variables: {
      id: uuidv4(),
      username: state.username,
      password: state.password,
    },
  })
  const [loginData, setLoginData] = useState()

  const [error, setError] = useState()

  const onSubmit = async data => {
    setState(data)
    sendLoginData()
    try {
      const { data } = await sendLoginData()
      setLoginData(data)
    } catch (error) {
      setError(error)
    }
  }
  return (
    <div>
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
