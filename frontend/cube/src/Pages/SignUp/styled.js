import styled from 'styled-components'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';

export const InputMaterial = styled(TextField)`
    width: 100%;
`

export const Div = styled.div`
    padding: 10px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Formu = styled.form`
    display: flex;
    flex-direction: column;
    height: 30%;
    justify-content: space-evenly;
`;

export const Buttonstyled = styled(Button)`
    &&{
        color: #000;
        width: 100%;
        background-color: #E8222E;
    }
`

export const DivPassword = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`