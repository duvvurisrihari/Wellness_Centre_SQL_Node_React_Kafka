import React, { Component } from 'react'
// import "../../App.css";
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
// Define a Login Component
class Login extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      username: '',
      password: '',
      authFlag: false,
      isInvalid: false
    }
    // Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
  }
  // Call the Will Mount to set the auth Flag to false
  componentWillMount () {
    this.setState({
      authFlag: false
    })
  }
  // username change handler to update state variable with the text entered by the user
  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    })
  }
  // password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    })
  }
  // submit Login handler to send a request to the node backend
  submitLogin = e => {
    if (this.state.username && this.state.password) {
      var headers = new Headers()
      // prevent page from refresh
      e.preventDefault()
      const data = {
        username: this.state.username,
        password: this.state.password
      }
      // set the with credentials to true
      axios.defaults.withCredentials = true
      // make a post request with the user data
      axios.post('http://localhost:3100/login', data).then(response => {
        console.log('Status Code : ', response)
        if (response.data === 'Incorrect password') {
          console.log('Setting auth flag- false[Incorrect password]')
          this.setState({
            authFlag: false,
            isInvalid: true
          })
        } else if (response.data === 'Email Id not found') {
          console.log('Setting auth flag- false[Invalid Email ID]')
          this.setState({
            authFlag: false,
            isInvalid: true
          })
        } else {
          console.log('Setting auth flag- true')
          localStorage.setItem('userid', response.data.c_id)
          localStorage.setItem('username', response.data.c_fname)
          console.log(response.data.c_id)
          this.setState({
            authFlag: true
          })
        }
      })
    }
  }

  render () {
    // redirect based on successful login
    let redirectVar = null
    const isAuth = this.state.authFlag
    const isInvalid = this.state.isInvalid
    console.log(isAuth)

    if (cookie.load('cookie')) {
      console.log('checking redirection')
      console.log(cookie.load('cookie'))
      redirectVar = <Redirect to='/buyer/restorder' />
    }

    return (
      <div>
        {redirectVar}
        <div class='container'>
          <div class='login-form' align='center'>
            <div class='main-div'>
              <div class='panel'>
                <h2>Login using your gym user account</h2>
                <div>{!isInvalid ? '' : 'Invalid'}</div>
              </div>
              <form>
                <div class='form-group '>
                  <input
                    onChange={this.usernameChangeHandler}
                    type='email'
                    class='form-control'
                    name='username'
                    placeholder='Username'
                    required='required'
                  />
                </div>
                <div class='form-group'>
                  <input
                    onChange={this.passwordChangeHandler}
                    type='password'
                    class='form-control'
                    name='password'
                    placeholder='Password'
                    required='required'
                  />
                </div>
                <button
                  type='submit'
                  onClick={this.submitLogin}
                  class='btn btn-primary'
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// export Login Component
export default Login
