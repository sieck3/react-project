import React from "react";
import '/src/css/login-component.css'

const LoginComponent = ({ page,register, login }) => (

    <div className={page!="login"?"off":"login-component"}>
        <h2>Login</h2>
        <div>
            <label>Username</label>
            <input />
        </div>
        <div>
            <label>Password</label>
            <input />
        </div>
        <div>
            <button onClick={login}>login</button>
            <button onClick={register}>Register</button>
        </div>
    </div>

)

export default LoginComponent