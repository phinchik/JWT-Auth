import React, { Component } from 'react'
import styles from './index.module.scss'
import axios from 'axios'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailVal: '',
            passwordVal: ''
        }
    }

    login = () => {
        axios.post('http://localhost:8080/api/login', { username: this.state.emailVal, password: this.state.passwordVal }).then(data => {
            localStorage.setItem('access_token', data.data);
            window.location.reload()
        })
    }

    onHandleEmail = (e) => {
        const value = e.target.value
        this.setState({ emailVal: value })
    }

    onHandlePassword = (e) => {
        const value = e.target.value
        this.setState({ passwordVal: value })
    }

    render() {
        return <div className={styles.container}>
            <div className={styles.formContainer}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} value={this.state.emailVal} onChange={this.onHandleEmail} />

                <label className={styles.label}>Password</label>
                <input className={styles.input} type="password" value={this.state.passwordVal} onChange={this.onHandlePassword} />

                <button className={styles.button} onClick={this.login}>Log In</button>
            </div>
        </div>
    }
}


export default Login;