import React, { Component } from 'react'
import '/src/css/test-component.css'
import TestComponent from '/src/component/test-component'
import { getDatabase, onValue, ref, set } from "firebase/database"

const firebase = require("/src/services/config.js");

const PAGES = [

    {
        link: "TestComponent"
    }
]




class ApplicationContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 'TestComponent',
            data:null
        }


        this.unFunction = this.unFunction.bind(this)

    }

    unFunction(event) {
        console.log("bind function, se puede enviar en un componente", this.state.page);
        const db = getDatabase();
        const distanceRef = ref(db, 'msj/');

        onValue(distanceRef, (snapshot) => {
            const data = snapshot.val();
            this.setState({data:data});
        });

   
    }


    componentDidMount() {

        console.log("ApplicationContainer did mount");
        console.log("bind function, se puede enviar en un componente", this.state.page);
        const db = getDatabase();
        const distanceRef = ref(db, 'msj/');

        onValue(distanceRef, (snapshot) => {
            const data = snapshot.val();
            this.setState({data:data});
        });

    }



    render() {
        return (
            <div className='app-container'>
                <h1>App Container</h1>
                {/* <TestComponent
                    param1={"Test component"}
                    param2={"este es un componente de prueba"} >
                </TestComponent> */}
                <button onClick={this.unFunction}>refresh</button>
                {this.state.data != null?
                this.state.data.map(

                    (element)=>(<p>{element}</p>)
        
                ):""}

                

            </div>
        )
    }
}

export default ApplicationContainer;