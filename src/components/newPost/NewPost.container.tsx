import { FC, FormEvent, MutableRefObject, useCallback, useEffect, useRef, useState } from "react"
import NewPost from "./NewPost"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "../../types/supabase-types"
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_toaster } from "../../redux/slices/toasterSlice"
import { Editor } from "tinymce"
import { StatusMessageTypesEnum } from "../FormMessage/FormMessage.container";
import { NewPostPageType } from "../../../pages/new-post";
import axios from "axios"

const NewPostContainer: FC<NewPostPageType> = ({
  username,
  profile_path
}) => {
  const mountedRef = useRef(true)
  const baseRef = useRef<Editor>()
  const descriptionRef = useRef<Editor>()

  const [errorMessage, setErrorMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const dispatch = useAppDispatch()
  const supabaseClient = useSupabaseClient<Database>()

  const triggerErrorMessage = (message: string) => {
    setErrorMessage(message)
    setShowMessage(true)
  }

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if(!baseRef.current?.getContent()) {
      triggerErrorMessage('The "Drop that poem" section musn\'t be empty')
      return
    }

    const postBaseContent = baseRef.current.getContent()
    const postDescriptionContent = descriptionRef.current?.getContent() || null

    axios.put('/api/post', {
      base: {
        author_username: username,
        post_content: postBaseContent,
        profile_path
      },
      description: {
        post_content: postDescriptionContent
      }
    })
    .then(({ data: { id }}) => {
      if(!mountedRef) return

      dispatch(update_toaster({
        title: 'New post',
        subtitle: 'Click here to view it.',
        to: `/post/${id}`
      }))

      baseRef.current?.setContent('')
      descriptionRef.current?.setContent('')

    })
    .catch(({ response: { data: { message }}}) => {
      triggerErrorMessage(message)
    })    
    
    setShowMessage(false)
    setTimeout(() => {
      setErrorMessage('')
    }, 300)
  }, [username, profile_path, dispatch, supabaseClient])

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  return (
    <NewPost
      baseRef={baseRef as MutableRefObject<Editor>}
      descriptionRef={descriptionRef as MutableRefObject<Editor>}
      handleSubmit={handleSubmit}
      formMessageProps={{
        message: errorMessage,
        showMessage,
        type: StatusMessageTypesEnum.ERROR
      }} />
  )
}

export default NewPostContainer