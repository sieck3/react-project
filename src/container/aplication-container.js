import React, { Component } from 'react'
import '/src/css/test-component.css'
import { getDatabase, onValue, ref, set } from "firebase/database"
import '/src/css/comment-component.css'

//No quitar el provider
const firebase = require("/src/services/config.js");

class ApplicationContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 'TestComponent',
            data: null,
            diptongo: false,
            textarea: "",
            name:"Invitado"
        }


        this.sendMsj = this.sendMsj.bind(this)

    }

    sendMsj() {

        console.log("Send msj");
        const db = getDatabase();
        const distanceRef = ref(db, 'comentarios/'+(this.state.data.length));
        set(distanceRef, {
            nombre: this.state.name, 
            comentario: this.state.textarea

        });
    

    }

    handleChange(event) {
        this.setState({ textarea: event.target.value });
        console.log("Send text");

    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
        console.log("Send name");

    }


    componentDidMount() {

        console.log("ApplicationContainer did mount");
        const db = getDatabase();
        const distanceRef = ref(db, 'comentarios/');

        onValue(distanceRef, (snapshot) => {
            const data = snapshot.val();
            this.setState({ data: data });

        });

    }



    render() {
        return (
            <div className='app-container'>
                <div className='comments-container'>

                    {this.state.data != null ?
                        this.state.data.map(
                            (element, index) => (

                                <div className={index % 2 ? 'comment-component' : 'comment-component-b'} key={index}>
                                    <label>{element.nombre + ": "}</label>
                                    <p>{element.comentario}</p>
                                </div>)
                        ) : ""
                    }

                </div>
                <div className='form-send-msj' >
                    <label>Escribe un mensaje: </label>
                    <input type="text" minLength="5" onChange={()=>{
                        this.handleChangeName(event)
                    }}/>
                    <div>
                        <textarea rows={4} onChange={() => {
                            this.handleChange(event)
                        }}></textarea>
                        <button onClick={this.sendMsj}>enviar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ApplicationContainer;