import React, { Component } from 'react'
import '/src/css/test-component.css'
import TestComponent from '/src/component/test-component'


class ApplicationContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            valueState: 'value'
        }


        this.unFunction = this.unFunction.bind(this)

    }

    unFunction(event) {
        console.log("bind function, se puede enviar en un componente");
    }

    componentDidMount() {

        console.log("ApplicationContainer did mount");

    }

    render() {
        return (
            <div className='app-container'>
                <h1>App Container</h1>
                <TestComponent param1={"Test component"} param2={"este es un componente de prueba"}/>
            </div>
        )
    }
}

export default ApplicationContainer;