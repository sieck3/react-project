import React, { Component } from 'react'
import { getDatabase, onValue, ref, set } from "firebase/database"
import '/src/css/login-container.css'
import RegisterComponent from '../component/register-component.js'
import LoginComponent from '../component/login-component.js';

import { _ } from 'core-js';

//No quitar el provider
const firebase = require("/src/services/config.js");

class LoginContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: "login",
        };

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        console.log("Login container");

    }

    register() {
        if (this.state.page != "register") {
            this.setState({ page: "register" });

        } else {
            console.log("Aqui se registra");
        }
    }

    login() {
        if (this.state.page != "login") {
            this.setState({ page: "login" });

        } else {
            console.log("Aqui se logea");

        }
    }


    render() {
        return (
            <div className='login-container'>
                {/* <div>
                    <button onClick={() => { this.register() }}>register</button>
                    <button onClick={() => { this.register() }}>login</button>
                </div> */}
                <RegisterComponent page={this.state.page} register={this.register} login={this.login} />
                <LoginComponent page={this.state.page} register={this.register} login={this.login} />

            </div >
        )
    }
}

export default LoginContainer;