import React, { Component } from 'react'
import styles from './index.module.scss'
import axios from 'axios'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailVal: '',
            passwordVal: '',
            signUp: false,
            token: null,
            isTaken: false,
            notExisting: false
        }
    }

    componentDidMount() {
        this.setState({ token: this.props.token })
    }

    login = () => {
        axios.post('http://localhost:8080/api/login', {
            body: JSON.stringify({
                email: this.state.emailVal,
                password: this.state.passwordVal
            })
        }, {
                headers: {
                    authorization: `Bearer ${this.state.token}`
                }
            }).then(data => {
                if (data.data.error) {
                    this.setState({ notExisting: true })
                } else {
                    this.props.onHandleToken(data.data)
                }
            })
    }

    signUp = () => {
        axios.post(
            `http://localhost:8080/api/signUp`, {
                body: JSON.stringify({
                    email: this.state.emailVal,
                    password: this.state.passwordVal
                })
            }, {
                headers: {
                    authorization: `Bearer ${this.state.token}`
                }
            })
            .then(data => {
                if (data.data.error) {
                    this.setState({ isTaken: true })
                } else {
                    this.props.onHandleToken(data.data)
                }
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

    onClickSignUp = () => {
        this.setState({ signUp: true })
    }

    render() {
        return <div className={styles.container}>

            {this.state.signUp ? <div className={styles.formContainer}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} value={this.state.emailVal} onChange={this.onHandleEmail} />

                <label className={styles.label}>Password</label>
                <input className={styles.input} type="password" value={this.state.passwordVal} onChange={this.onHandlePassword} />

                <button className={styles.button} onClick={this.signUp}>Sign Up</button>
            </div> :
                <div className={styles.formContainer}>
                    <label className={styles.label}>Email</label>
                    <input className={styles.input} value={this.state.emailVal} onChange={this.onHandleEmail} />

                    <label className={styles.label}>Password</label>
                    <input className={styles.input} type="password" value={this.state.passwordVal} onChange={this.onHandlePassword} />

                    <button className={styles.button} onClick={this.login}>Log In</button>
                    <button className={styles.button} onClick={this.onClickSignUp}>Sign Up</button>
                </div>}
            {this.state.isTaken && <div>
                <div className={styles.errorMsg}>*The Email is already taken*</div>
            </div>}

            {this.state.notExisting && <div>
                <div className={styles.errorMsg}>*Incorrect Email or Password*</div>
            </div>}

        </div>

    }
}


export default Login;