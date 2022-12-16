import React from 'react'
import '/src/css/register-component.css'

const RegisterComponent = ({ page, register, login, handleChangeName, handleChangePwd, handleChangePwdRepeat }) => (

    <div className={page != "register" ? "off" : 'register-component'}>
        <h2>Register</h2>
        <div>
            <label>Username</label>
            <input onChange={() => {
                handleChangeName(event);
            }} />
        </div>
        <div>
            <label>Password</label>
            <input type="password" onChange={() => {
                handleChangePwd(event);
            }} />
        </div>
        <div>
            <label>Repeat Password</label>
            <input type="password" onChange={() => {
                handleChangePwdRepeat(event);
            }} />
        </div>
        <div>
            <button onClick={register}>Register</button>
            <button onClick={login}>login</button>
        </div>
    </div>
)

export default RegisterComponent