import React from "react";
import '/src/css/login-component.css'

const LoginComponent = ({ page, register, login, handleChangeName, handleChangePwd }) => (

    <div className={page != "login" ? "off" : "login-component"}>
        <h2>Login</h2>
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
        <div className="btn-container">
            <button onClick={login}>login</button>
            <button onClick={register}>Register</button>
        </div>
    </div>

)

export default LoginComponent