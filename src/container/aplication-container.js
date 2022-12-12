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
            name: "Invitado",
            time: 0,
            msj: "h",
        }


        this.sendMsj = this.sendMsj.bind(this)

    }

    sendMsj() {

        let today = new Date();
        if (today.getMinutes() > (this.state.time)) {
            const db = getDatabase();
            const distanceRef = ref(db, 'comentarios/' + (this.state.data.length));
            if (this.state.textarea != "") {
                set(distanceRef, {
                    nombre: this.state.name,
                    comentario: this.state.textarea

                });
            }

            let now = today.getMinutes();
            console.log("date", now);
            this.setState({ time: now });
            this.setState({msj:""});
        }

    }

    handleChange(event) {
        this.setState({ textarea: event.target.value });

    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });

    }

    handleChangeComment(event) {

        this.setState({ msj: event.target.value });
    }



    componentDidMount() {

        const db = getDatabase();
        const distanceRef = ref(db, 'comentarios/');

        onValue(distanceRef, (snapshot) => {
            const data = snapshot.val();
            this.setState({ data: data });

        });

        let time = new Date();
        this.setState({ time: time.getMinutes() });
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
                    <div className='form-btn-container'>
                        <input type="text" minLength="5" onChange={() => {
                            this.handleChangeName(event)
                        }} />
                        <button onClick={this.sendMsj}>enviar</button>
                    </div>
                    <div>
                        <textarea rows={4} onChange={() => {
                            this.handleChange(event)
                           this.handleChangeComment(event)
                        }} value={this.state.msj}></textarea>
                    </div>
                </div>
            </div>
        )
    }
}

export default ApplicationContainer;