import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
class GHNav extends Component {
  state = {}
  handleLogout = () => {
    console.log('Deleting Cookie')
    cookie.remove('cookie', { path: '/' })
    cookie.remove('owner', { path: '/' })
  }
  render () {
    // if Cookie is set render Logout Button
    let navLogin = null
    if (cookie.load('cookie') || cookie.load('owner')) {
      console.log('Able to read cookie')
      navLogin = (
        <ul class='nav navbar-nav navbar-right'>
          <li>
            <Link to='/buyer/login' onClick={this.handleLogout}>
              <span class='glyphicon glyphicon-user' />
              Logout
            </Link>
          </li>
        </ul>
      )
    } else {
      // Else display login button
      console.log('Not Able to read cookie')
      navLogin = (
        <ul class='nav navbar-nav navbar-right'>
          <li>
            <Link to='/buyer/login'>
              <span class='glyphicon glyphicon-log-in' /> Login
            </Link>
          </li>
        </ul>
      )
    }
    return (
      <div>
        <nav class='navbar navbar-expand-lg navbar-light bg-light'>
          <a class='navbar-brand' href='#'>
            <font color='red'> GYM APP </font>
          </a>
          <button
            class='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span class='navbar-toggler-icon' />
          </button>

          <div
            class='collapse navbar-collapse'
            id='navbarSupportedContent'
            align='right'
          >
            <ul class='navbar-nav mr-auto'>
              <li class='nav-item active'>
                <a class='nav-link' href='/buyer/restorder'>
                  Home <span class='sr-only'>(current)</span>
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/buyer/user'>
                  SignUp
                </a>
              </li>
              
            </ul>
          </div>
          {navLogin}
        </nav>
      </div>
    )
  }
}

export default GHNav
