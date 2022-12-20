import React, { Component } from 'react'
import { _ } from 'core-js';
import '../css/aplication-container.css'
import LoginContainer from './login-container.js'
import CommentsContainer from '../container/comments-container'

class AplicationContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        console.log("App container");
        let getCookieUserName = this.getCookie("name");
        let getCookieUserPsw = this.getCookie("psw");
        console.log("name", getCookieUserName);
        console.log("psw", getCookieUserPsw);

        if (getCookieUserName != "" && getCookieUserPsw != "") {

            this.setState({ user: { nombre: getCookieUserName, password: getCookieUserPsw } });

        } else {

            console.log("Yes");

        }
    }

    login(x) {

        this.setState({ user: x });
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    render() {
        return (
            <div>
                {this.state.user != null ? <CommentsContainer login={this.login} user={this.state.user} /> : <LoginContainer login={this.login} />}

            </div >
        )
    }
}

export default AplicationContainer;