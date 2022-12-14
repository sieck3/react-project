import React from 'react'
import '/src/css/register-component.css'

const RegisterComponent = ({page,register,login}) => (

    <div className={page !="register"?"off":'register-component'}>
        <h2>Register</h2>
        <div>
            <label>Username</label>
            <input />
        </div>
        <div>
            <label>Password</label>
            <input />
        </div>
        <div>
            <label>Repeat Password</label>
            <input />
        </div>
        <div>
            <button onClick={register}>Register</button>
            <button onClick={login}>login</button>
        </div>
    </div>
)

export default RegisterComponent