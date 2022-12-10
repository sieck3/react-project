import React, { Component } from 'react'
import '/src/css/test-component.css'
import TestComponent from '/src/component/test-component'

const PAGES = [

    {
        link: "TestComponent"
    }
]

const URL_BD = "https://filessave-73b1a-default-rtdb.firebaseio.com/nom"


class ApplicationContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 'TestComponent'
        }


        this.unFunction = this.unFunction.bind(this)

    }

    unFunction(event) {
        console.log("bind function, se puede enviar en un componente", this.state.page);
    }

    componentDidMount() {

        console.log("ApplicationContainer did mount");

        // fetch(URL_BD)
        //     .then(response => response.json())
        //     .then(response => {
        //         console.log("Respuesta: ", response);
        //     })

    }



    render() {
        return (
            <div className='app-container'>
                <h1>App Container</h1>
                <TestComponent
                    param1={"Test component"}
                    param2={"este es un componente de prueba"} >
                </TestComponent>
                <button onClick={this.unFunction}>Check</button>
            </div>
        )
    }
}

export default ApplicationContainer;