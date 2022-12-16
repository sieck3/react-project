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
    }

    login(x) {

        this.setState({ user: x });
    }

    render() {
        return (
            <div>
                {this.state.user != null ? <CommentsContainer /> : <LoginContainer login={this.login} />}

            </div >
        )
    }
}

export default AplicationContainer;