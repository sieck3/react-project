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
            name: null,
            psw: null,
            repeatPwd: null,
        };

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePwd = this.handleChangePwd.bind(this);
        this.handleChangePwdRepeat = this.handleChangePwdRepeat.bind(this);
    }

    componentDidMount() {
        console.log("Login container");

    }

    register() {
        if (this.state.page != "register") {
            this.setState({ page: "register" });

        } else {
            console.log("Aqui se registra");

            if (this.state.name != null
                && this.state.psw != null
                && this.state.repeatPwd != null
                && (this.state.psw == this.state.repeatPwd)) {

                console.log("Result ", this.state.name, this.state.psw, this.state.repeatPwd);

                const db = getDatabase();
                const distanceRef = ref(db, 'cuentas/' + this.state.name);

                set(distanceRef, {
                    nombre: this.state.name,
                    password: this.state.psw

                });
            }

        }
    }

    login() {
        if (this.state.page != "login") {
            this.setState({ page: "login" });

        } else {

            if (this.state.name != null) {
                const db = getDatabase();
                const distanceRef = ref(db, 'cuentas/' + this.state.name);

                onValue(distanceRef, (snapshot) => {
                    const data = snapshot.val();

                    if (data != null) {

                        if (this.state.psw != null && data.password == this.state.psw) {
                            console.log("datos correctos");
                            this.props.login(data)
                            // console.log(data.nombre);

                        } else {

                            console.log("Password incorrecto");
                        }

                    } else {

                        console.log("no tienen datos");

                    }
                })
            }
        }
    }

    handleChangeName(event) {
        console.log("Name", event.target.value);
        this.setState({ name: event.target.value });

    }

    handleChangePwd(event) {
        console.log("Pwd", event.target.value);
        this.setState({ psw: event.target.value });


    }

    handleChangePwdRepeat(event) {
        console.log("Repeat", event.target.value);
        this.setState({ repeatPwd: event.target.value });


    }

    render() {
        return (
            <div className='login-container'>
                {/* <div>
                    <button onClick={() => { this.register() }}>register</button>
                    <button onClick={() => { this.register() }}>login</button>
                </div> */}
                <RegisterComponent
                    page={this.state.page}
                    register={this.register}
                    login={this.login}
                    handleChangeName={this.handleChangeName}
                    handleChangePwd={this.handleChangePwd}
                    handleChangePwdRepeat={this.handleChangePwdRepeat}
                />
                <LoginComponent
                    page={this.state.page}
                    register={this.register}
                    login={this.login}
                    handleChangeName={this.handleChangeName}
                    handleChangePwd={this.handleChangePwd}
                />

            </div >
        )
    }
}

export default LoginContainer;