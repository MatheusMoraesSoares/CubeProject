import React, { useState } from "react";
import { Div, Formu, Buttonstyled, DivPassword, InputMaterial } from './styled'
import { IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import {BASE_URL} from '../../Constants/url'
import { goToFeed } from "../../Router/coordinator";
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [ email, setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [ errEmail, setErrEmail] = useState('')
    const [ errPass, setErrPass] = useState()
    const [checkErrEmail, setCheckErrEmail] = useState(false)
    const [checkErrPass, setCheckErrPass] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const navigate = useNavigate()

    const onSubmitLogin = (event) => {
        event.preventDefault()

        const userLogin = {
            email,
            password
        }

        loginApi(userLogin)
        console.log(userLogin)
    }

    const loginApi = async(body) => {
        await axios
            .post(`${ BASE_URL}/user/login`, body)
            .then((res)=>{
                setEmail('')
                setPassword('')
                setErrEmail('')
                setErrPass('')
                setCheckErrEmail(false)
                setCheckErrPass(false)
                localStorage.setItem(`token`, res.data.token)
                goToFeed(navigate)
            })
            .catch((err)=>{
                if(err.response.data.message.includes('Invalid credentials: password')){
                    setErrPass(err.response.data.message)
                    setCheckErrPass(true)
                } else {
                    setErrEmail(err.response.data.message)
                    setCheckErrEmail(true)
                }
                console.log(err.response.data.message)
            })
    }

    return (
        <Div>
            <p>Entrar</p>
            <Formu onSubmit={onSubmitLogin}>
                <InputMaterial 
                    error = {checkErrEmail}
                    helperText={checkErrEmail ? errEmail : ''}
                    id="outlined-basic" 
                    label="Email" 
                    type={"email"}
                    variant="outlined" 
                    placeholder={"email@email.com"}
                    value={email}
                    onChange={(event)=> setEmail(event.target.value)}
                    required
                />
                <DivPassword>
                <InputMaterial 
                    error = {checkErrPass}
                    helperText={checkErrPass ? errPass : ''}
                    id="outlined-basic" 
                    label="Password" 
                    type={showPassword ? 'password' : 'text'}
                    variant="outlined" 
                    placeholder={"Minimo 6 caracteres"}
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                    inputProps={{minLength:6, title:"A senha deve conter no minimo 6 caracteres"}}
                    required
                />
                <IconButton
                    aria-lable="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                >
                    {showPassword ? <VisibilityOff/> : < Visibility />}
                </IconButton>
                </DivPassword>
                <Buttonstyled type='submit' > Entrar </Buttonstyled>
            </Formu>
        </Div>
    )
}

export default Login