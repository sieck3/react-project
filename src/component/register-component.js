import React from 'react'
import '/src/css/register-component.css'

const RegisterComponent = ({ page, register, login, handleChangeName, handleChangePwd, handleChangePwdRepeat }) => (

    <div className={page != "register" ? "off" : 'register-component'}>
        <h2>Register</h2>
        <div>
            <label>Username</label>
            <input id="register" onChange={() => {
                handleChangeName(event);
            }} />
        </div>
        <div>
            <label>Password</label>
            <input id="psw" type="password" onChange={() => {
                handleChangePwd(event);
            }} />
        </div>
        <div>
            <label>R Password</label>
            <input id="pswR" type="password" onChange={() => {
                handleChangePwdRepeat(event);
            }} />
        </div>
        <div className="btn-container">
            <button onClick={register}>Register</button>
            <button onClick={login}>login</button>
        </div>
    </div>
)

export default RegisterComponent