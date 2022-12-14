import React, { Component } from 'react'
import { _ } from 'core-js';
import CommentsContainer from './comments-container.js'
class AplicationContainer extends Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {
        console.log("App container");
    }

    render() {
        return (
            <div>
                <CommentsContainer />
            </div >
        )
    }
}

export default AplicationContainer;