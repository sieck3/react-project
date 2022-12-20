import React, { Component } from 'react'
import { getDatabase, onValue, ref, set } from "firebase/database"
import '/src/css/comments-container.css'
import { _ } from 'core-js';

//No quitar el provider
const firebase = require("/src/services/config.js");

class CommentsContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            diptongo: false,
            name: "Invitado",
            msj: "",
            textarea: "",
            darkMode: false,
            seconds: 0,
            timeLimit: 30
        };


        this.sendMsj = this.sendMsj.bind(this);
        this.changeDarkMode = this.changeDarkMode.bind(this);

    }

    componentDidMount() {
        console.log("Comments container");
        const db = getDatabase();
        const distanceRef = ref(db, 'comentarios/');

        onValue(distanceRef, (snapshot) => {
            const data = snapshot.val();
            this.setState({ data: data });

        })

        this.interval = setInterval(() => this.tick(), 1000);


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

                let date = this.createDate();
                set(distanceRef, {
                    nombre: this.props.user.nombre,
                    comentario: this.state.textarea,
                    fecha: date
                });
            } else {

                alert("Escribe algo...");

            }
            this.setState({ msj: "" });
            this.setState({ seconds: 0 });
            this.goToBottom();
        } else {
            alert("Tienes que esperar " + (this.state.timeLimit - this.state.seconds) + " para mandar otro mensaje!");
        }
    }

    createDate() {
        let x = new Date();
        let date = (x.getHours() + ":" + ((x.getMinutes() < 10 ? '0' : '') + x.getMinutes()) + " " + x.getDay() + "/" + x.getMonth() + "/" + x.getFullYear());
        return date;
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

    logOut() {
        this.props.login(null)
        this.setCookie("psw", "", 0);
        this.setCookie("name", "", 0);

    }

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    render() {
        return (
            <div id="app-container" className={this.state.darkMode ? "dark-mode" : "app-container"}>
                <div className="btn-dark-mode">
                    <button onClick={() => { this.changeDarkMode() }} >{this.state.darkMode ? "o" : "|"}</button>
                    <button onClick={() => { this.goToBottom() }}>V</button>
                    <button onClick={() => { this.logOut() }}>Exit</button>
                </div>

                <div className='comments-container'>
                    {this.state.data != null ?
                        this.state.data.map(
                            (element, index) => (

                                <div className={index % 2 ? 'comment-component' : 'comment-component-b'} key={index}>
                                    <div>
                                        <label>{element.nombre + ": "}</label>
                                        <label>{element.fecha}</label>
                                    </div>
                                    <p>{element.comentario}</p>
                                </div>)
                        ) : ""
                    }

                </div>
                <div className='form-send-msj' >
                    <div>

                        <label>Escribe un mensaje: </label>

                    </div>

                    <div>
                        <textarea rows={4} onChange={() => {
                            this.handleChange(event)
                            this.handleChangeComment(event)
                        }} value={this.state.msj}></textarea>
                    </div>
                    <div className='form-btn-container'>
                        {/* <input type="text" minLength="5" placeholder="Name" onChange={() => {
                            this.handleChangeName(event)
                        }} /> */}
                        <button onClick={this.sendMsj}>enviar</button>
                    </div>
                </div>
            </div >
        )
    }
}

export default CommentsContainer;