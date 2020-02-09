import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import { readdirSync } from 'fs'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import logo from './photo.jpg';
class CentralContent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  /*
  itemsearch = e => {
    this.setState({ searchtext: e.target.value })
    console.log(this.state.searchtext)
  }
  search = e => {
    e.preventDefault()
    console.log('search clicked')
    axios
      .get(`http://localhost:3100/items/${this.state.searchtext}`)
      .then(response => {
        console.log('Onclick')
        console.log(JSON.stringify(response.data))
      })
  }
  componentDidMount () {
    axios.get(`http://localhost:3100/items/${'pizza'}`).then(response => {
      console.log('populate')
      console.log(response.data)
    })
  }*/

  render () {
    return (
      <div >
        <div >
          <h1 class='display-4'>{}</h1>

          <div class='lead m-4' align='center'>
            <span styles='color:blue'>{this.state.text}</span>
            <br />
            <img src={logo} alt="Logo" />
            <br />
            <a href='/owner/ownerlogin' type='button' class='btn btn-dark m-2'>
              Staff Login
            </a>
            <a href='buyer/login' type='button' class='btn btn-dark m-2'>
              Client Login
            </a>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

export default CentralContent
