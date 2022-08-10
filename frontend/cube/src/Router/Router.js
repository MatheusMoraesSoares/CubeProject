import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '../Pages/Login/Login'
import SignUp from '../Pages/SignUp/SignUp'

const Router= () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login/>}/>
                <Route path='/signUp' element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router