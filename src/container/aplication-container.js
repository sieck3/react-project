import React, { Component } from 'react'
import { getDatabase, onValue, ref, set } from "firebase/database"
import '/src/css/comment-component.css'

//No quitar el provider
const firebase = require("/src/services/config.js");

class ApplicationContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            diptongo: false,
            textarea: "",
            name: "Invitado",
            msj: "",
            darkMode: false,
            seconds: 0,
            timeLimit: 5,
        };


        this.sendMsj = this.sendMsj.bind(this);
        this.changeDarkMode = this.changeDarkMode.bind(this);

    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }

    goToBottom() {

        window.scrollBy(0, document.getElementById("app-container").clientHeight + 100);

    }
    sendMsj() {


        if (this.state.seconds > this.state.timeLimit) {
            const db = getDatabase();
            const distanceRef = ref(db, 'comentarios/' + (this.state.data.length));
            if (this.state.textarea != "") {
                set(distanceRef, {
                    nombre: this.state.name,
                    comentario: this.state.textarea

                });
            }else{

                alert("Escribe algo...");

            }
            this.setState({ msj: "" });
            this.setState({ seconds: 0 });
            this.goToBottom();
        } else {
            alert("Tienes que esperar " + (this.state.timeLimit - this.state.seconds) + " segundos para mandar otro mensaje!");
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

    changeDarkMode() {

        this.setState({ darkMode: !this.state.darkMode })

    }



    componentDidMount() {

        const db = getDatabase();
        const distanceRef = ref(db, 'comentarios/');

        onValue(distanceRef, (snapshot) => {
            const data = snapshot.val();
            this.setState({ data: data });

        })

        this.interval = setInterval(() => this.tick(), 1000);

    }


    render() {
        return (
            <div id="app-container" className={this.state.darkMode ? "dark-mode" : "app-container"}>
                <div className="btn-dark-mode">
                    <button onClick={() => { this.changeDarkMode() }} >{this.state.darkMode ? "o" : "|"}</button>
                    <button onClick={() => { this.goToBottom() }}>V</button>
                </div>

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
            </div >
        )
    }
}

export default ApplicationContainer;