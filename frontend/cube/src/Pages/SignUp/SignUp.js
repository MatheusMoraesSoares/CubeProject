import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../../Constants/url'
import { useForm } from '../../Hooks/useForm'
import { Buttonstyled, Div, DivPassword, InputMaterial } from './styled'

const SignUp = () => {

    const { form, onChange, clean } = useForm({
        "email": "",
        "password": ""
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showCheckPass, setShowCheckPass] = useState(true)
    const [checkErrPass, setCheckErrPass] = useState(false)


    const handleClickShowPassword = () => {
        setShowPass(!showPass)
    }
    const handleClickShowCheckPassword = () => {
        setShowCheckPass(!showCheckPass)
    }

    const onSubmitForm = (event) => {
        event.preventDefault()
        
        if(form.password !== confirmPassword) {
            setCheckErrPass(true)
        } else {
            setCheckErrPass(false)
            signUpApi()
        }
    }

    const signUpApi = async() => {
        await axios.post(`${BASE_URL}/user/signup`, form)
        .then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)

        })
        .catch((err) => {
            console.log(err.response.data.message)
            clean()
            setConfirmPassword('')
        })
    }

    return (
        <Div>
            <p>Cadastrar</p>
            <form onSubmit={onSubmitForm}>
                <InputMaterial
                    id="outlined-basic"
                    label={"Email"}
                    name='email'
                    type={'email'}
                    placeholder={'digite seu email'}
                    variant="outlined"
                    value={form.email}
                    onChange={onChange}
                    required
                />
                <DivPassword>
                    <InputMaterial
                        // error={checkErrPass}
                        // helperText={checkErrPass ? errPass : ''}
                        id="outlined-basic"
                        label="Password"
                        name="password"
                        type={showPass ? 'password' : 'text'}
                        variant="outlined"
                        placeholder={'Minimo 6 caracteres'}
                        value={form.password}
                        onChange={onChange}
                        inputPProps={{ minLength: 6, title: "A senha deve conter no minimo 6 digitos" }}
                        required
                    />
                    <IconButton
                        aria-label="togle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                    >
                        {showPass ?  <VisibilityOff /> : <Visibility /> }
                    </IconButton>
                </DivPassword>
                <DivPassword>
                    <InputMaterial
                        error={checkErrPass}
                        helperText={checkErrPass ? 'As senhas devem coincidir.' : ''}
                        id="outlined-adorment-basic"
                        label="Confirmar"
                        type={showCheckPass ? 'text' : 'password'}
                        placeholder={'Minimo 6 caracteres'}
                        inputProps={{ minLength: 6, title: "A senha deve conter no minimo 6 digitos" }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <IconButton
                        aria-label="togle password visibility"
                        onClick={handleClickShowCheckPassword}
                        edge="end"
                    >
                        {showCheckPass ? <Visibility /> : <VisibilityOff />  }
                    </IconButton>
                </DivPassword>
                <Buttonstyled type="submit">Cadastrar</Buttonstyled> 
            </form>
        </Div>
    )
}

export default SignUp