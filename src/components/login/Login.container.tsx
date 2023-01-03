import { FC, FormEvent, useRef, useState } from "react"
import { useAppDispatch } from "../../redux/redux_hooks"
import { update_userData } from "../../redux/slices/userSlice"
import { supabase } from "../../utils/supabase"
import { InputOnChangeType } from "../input/Input"
import Login from "./Login"

export const LoginContainer: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email: emailRef.current?.value ?? '',
      password: password,
    })

    if(data?.session) {
      dispatch(update_userData(data.session))
    }
  }

  const handlePasswordUpdate = (event: InputOnChangeType): void => {
    setPassword(event.currentTarget.value)
  }

  return (
    <Login
      ref={emailRef}
      password={password}
      handlePasswordUpdate={handlePasswordUpdate}
      handleSubmit={handleLogin} />
  )
}

export default LoginContainer