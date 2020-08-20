import React, { useState } from "react"
import { useForm } from "react-hook-form"

const Login = () => {
  const [state, setState] = useState({})
  const { register, handleSubmit } = useForm()
  const onSubmit = data => setState(data)
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
