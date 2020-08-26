import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { useMutation, gql } from "@apollo/client"
import { handleError, isTokenAlive } from "../utils"
import ls from "local-storage"

const CREATE_PAGE = gql`
  mutation registerPage($id: String!, $title: String!) {
    createPage(
      input: { clientMutationId: $id, title: $title, status: PUBLISH }
    ) {
      clientMutationId
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

const CreatePage = () => {
  const [state, setState] = useState({})
  const { register, handleSubmit, reset } = useForm()
  const user = ls("user")
  const authToken = ls("authToken")
  const refreshToken = ls("refreshToken")

  const id = ls("mutationId")

  const [mutateRefreshToken] = useMutation(REFRESH_TOKEN)

  const refreshTokenFn = async () => {
    const { data } = await mutateRefreshToken({
      variables: {
        token: refreshToken,
        id,
      },
    })

    ls.set("authToken", data.refreshJwtAuthToken.authToken)
  }

  const [createPage] = useMutation(CREATE_PAGE, {
    variables: {
      id: uuidv4(),
      title: state.title,
    },
  })

  const onSubmit = async data => {
    setState(data)
    const validToken = isTokenAlive(user?.jwtAuthExpiration)
    console.log("validToken", validToken)
    if (!validToken) {
      await refreshTokenFn().catch({ handleError })
    }
    await createPage().catch(handleError)
    reset()
  }
  return (
    <div>
      <h2>Create Page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="title"
          placeholder="Page Title"
          ref={register({ required: true })}
        />

        <input type="submit" value="Create New Page!" />
      </form>
    </div>
  )
}

export default CreatePage
