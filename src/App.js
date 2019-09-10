import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      emailVal: '',
      passwordVal: '',
      token: null,
      post: null
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('access_token')
    if(token){
     this.setState({token})
    }
  }

  getPost = () => {
    axios.get('http://localhost:8080/api/posts', {
      headers: {
        authorization: `Bearer ${this.state.token}`
      }
    }).then(data => {
      this.setState({post: data.data.message})
    })
  }

  login = () => {
    axios.post('http://localhost:8080/api/login', {username: this.state.emailVal, password: this.state.passwordVal}).then(data => {
      localStorage.setItem('access_token', data.data);
      window.location.reload()
    })
  }

  logout = () => {
    localStorage.removeItem('access_token');
    window.location.reload()
  }

  onHandleEmail = (e) => {
    const value = e.target.value
    this.setState({emailVal: value})
  }

  onHandlePassword = (e) => {
    const value = e.target.value
    this.setState({passwordVal: value})
  }

  render(){
    return <div>
      {this.state.token ? <div>
        <p>USER IS SIGNED IN</p>
        <div>{this.state.post}</div>
        <button onClick={this.getPost}>Get Post</button>
        <button onClick={this.logout}>LOG OUT</button>
      </div> : <div>
        <label>Email</label>
      <input value={this.state.emailVal} onChange={this.onHandleEmail}/>

      <label>Password</label>
      <input value={this.state.passwordVal} onChange={this.onHandlePassword}/>

      <button onClick={this.login}>Log In</button>
      </div>}
    </div>
  }
}


export default App;
