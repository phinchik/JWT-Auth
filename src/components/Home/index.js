import React, { Component } from 'react'
import styles from './index.module.scss'
import axios from 'axios'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            token: null
        }
    }

    componentDidMount() {
        this.setState({ token: this.props.token })
    }

    getPost = () => {
        axios.get('http://localhost:8080/api/posts', { data: this.state.token }, {
            headers: {
                authorization: `Bearer ${this.state.token}`
            }
        }).then(data => {
            this.setState({ post: data.data.message })
        })
    }

    render() {
        return <div>
            Welcome To my Dummy Auth App!!!
               <div>{this.state.post}</div>
            <button onClick={this.getPost}>Get Post</button>
        </div>
    }
}

export default Home