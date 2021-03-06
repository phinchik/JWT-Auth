import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './components/Header'
import Login from './components/Login'
import Home from './components/Home'

export const getToken = () => {
  return updatedToken
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('access_token')
    if (token) {
      this.setState({ token })
    }
  }



  logout = () => {
    localStorage.removeItem('access_token');
    window.location.reload()
  }

  onHandleToken = (token) => {
    this.setState({ token })
  }



  render() {
    return <div>
      <Header token={this.state.token} logout={this.logout} />
      {this.state.token ? <Home token={this.state.token} /> : <Login onHandleToken={this.onHandleToken} token={this.state.token} />
      }
    </div>
  }
}


export default App;
