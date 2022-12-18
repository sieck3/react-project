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
            exist: false
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

            const db = getDatabase();
            const distanceRef = ref(db, 'cuentas/' + this.state.name);





            onValue(distanceRef, (snapshot) => {
                const data = snapshot.val();

                console.log("datas ", data);

                if (data != null) {


                    if (data.nombre == this.state.name && this.state.exist) {
                        alert("Ese nick ya existe");
                    }
                    this.setState({ exist: true });


                } else {

                    this.setState({ exist: false });

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

                        document.getElementById("register").value = "";
                        document.getElementById("psw").value = "";
                        document.getElementById("pswR").value = "";
                        alert("Cuenta creada!");

                        this.setState({
                            exist: true,
                            name: null,
                            psw: null,
                            repeatPwd: null
                        });
                        this.setState({ page: "login" });

                    }


                }



                console.log("Existe ", this.state.exist);
            })

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
                            this.setCookie("name", data.nombre, 1);
                            this.setCookie("psw", data.password, 1);

                            // console.log(data.nombre);

                        } else {

                            console.log("Password incorrecto");
                        }

                    } else {

                        console.log("no tienen datos");
                        alert("alguno de los campos es incorrecto");

                    }
                })
            }
        }
    }

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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