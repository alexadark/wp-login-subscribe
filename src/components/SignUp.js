import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { useMutation, gql } from "@apollo/client"

const REGISTER_USER = gql`
  mutation registerUserMutation(
    $username: String!
    $id: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    registerUser(
      input: {
        clientMutationId: $id
        username: $username
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      user {
        username
      }
    }
  }
`

const SignUp = () => {
  const [state, setState] = useState({})
  const { register, handleSubmit } = useForm()

  const [registerUser] = useMutation(REGISTER_USER, {
    variables: {
      id: uuidv4(),
      username: state.username,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
    },
  })

  const [userData, setUserData] = useState()
  const [error, setError] = useState()

  const onSubmit = async data => {
    setState(data)
    registerUser()
    try {
      const { userData } = await registerUser()
    } catch (error) {
      setError(error)
    }
  }
  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          ref={register({ required: true })}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          ref={register({ required: true })}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          ref={register({ required: true })}
        />
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

        <input type="submit" value="Sign Up!" />
      </form>
    </div>
  )
}

export default SignUp
