import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"

const SignUp = () => {
  const [state, setState] = useState({})
  const { register, handleSubmit } = useForm()

  const onSubmit = data => {
    setState(data)
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
