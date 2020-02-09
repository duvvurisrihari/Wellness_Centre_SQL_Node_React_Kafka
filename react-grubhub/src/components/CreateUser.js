import React, { Component } from 'react'
import axios from 'axios'
// import cookie from "react-cookies";
// import { Redirect } from "react-router";

class CreateUser extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {

      c_fname:'',
      c_mname:'',
      c_lname:'',
      join_date:'',
      date_of_birth:'',
      c_id:'',
      phone:'',
      sex:'',
      address:'',
      EmailID:'',
      createpassword:'',
      UserCreated: false
    }
    // Bind the handlers to this class
    this.submitCreate = this.submitCreate.bind(this)
    this.FNameChangeHandler = this.FNameChangeHandler.bind(this)
    this.MNameChangeHandler = this.MNameChangeHandler.bind(this)
    this.LNameChangeHandler = this.LNameChangeHandler.bind(this)

    this.JDateChangeHandler = this.JDateChangeHandler.bind(this)
    this.BDateChangeHandler = this.BDateChangeHandler.bind(this)
    this.IdChangeHandler = this.IdChangeHandler.bind(this)
    this.PhoneChangeHandler = this.PhoneChangeHandler.bind(this)
    this.SexChangeHandler = this.SexChangeHandler.bind(this)
    this.AddressChangeHandler = this.AddressChangeHandler.bind(this)

    this.EmailIDChangeHandler = this.EmailIDChangeHandler.bind(this)
    this.createpasswordChangeHandler = this.createpasswordChangeHandler.bind(this)
  }
  // Name change handler to update state variable with the text entered by the user
  FNameChangeHandler = e => {
    this.setState({
      c_fname: e.target.value
    })}
    
    MNameChangeHandler = e => {
    this.setState({
      c_mname: e.target.value
    })}

    LNameChangeHandler = e => {
    this.setState({
      c_lname: e.target.value
    })}
    JDateChangeHandler = e => {
    this.setState({
      join_date: e.target.value
    })}

    BDateChangeHandler = e => {
    this.setState({
      date_of_birth: e.target.value
    })}

    IdChangeHandler = e => {
    this.setState({
      c_id: e.target.value
    })}
    PhoneChangeHandler = e => {
    this.setState({
      phone: e.target.value
    })}

    SexChangeHandler = e => {
    this.setState({
      sex: e.target.value
    })}
    AddressChangeHandler = e => {
    this.setState({
      address: e.target.value
    })
  }
  EmailIDChangeHandler = e => {
    this.setState({
      EmailID: e.target.value
    })
  }
  createpasswordChangeHandler = e => {
    this.setState({
      createpassword: e.target.value
    })
  }
  submitCreate = e => {
    if (this.state.EmailID && this.state.createpassword) {
      var headers = new Headers()
      // prevent page from refresh
      e.preventDefault()
      const data = {
      c_fname:this.state.c_fname,
      c_mname:this.state.c_mname,
      c_lname:this.state.c_lname,
      join_date:this.state.join_date,
      date_of_birth:this.state.date_of_birth,
      c_id:this.state.c_id,
      phone:this.state.phone,
      sex:this.state.sex,
      address:this.state.address,
      EmailID:this.state.EmailID,
      createpassword:this.state.createpassword
       
      }
      console.log(data)
      axios.post('http://localhost:3100/buyersignup', data).then(response => {
        // update the state with the response data
        console.log(response.data)
        if (response.data == 'Your Gym UserID is Created') {
          this.setState({ UserCreated: true })
          console.log(this.state.UserCreated)
        } else {
          this.setState({ UserCreated: false })
        }
      })
    }
    setTimeout(function () {
      alert('Account Created -Please Login')
    }, 1500)
    //this.props.history.push('/buyer/login')
  }

  render () {
    const UserCreated = this.state.UserCreated
    let redirectVar = null
    console.log(UserCreated)
    
    /* if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/user" />;
    } */

    //c_fname,c_mname,c_lname,join_date,date_of_birth,c_id,phone,sex,address,email,password
    return (
      <div>
        <br />
        <div className='container' align='center'>
          <h1>Client Sign Up</h1>
          <form onSubmit={this.submitCreate} method='post'>
            {redirectVar}
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='c_fname'
                onChange={this.FNameChangeHandler}
                placeholder='First Name'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='c_mname'
                onChange={this.MNameChangeHandler}
                placeholder='Middle Name'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='c_lname'
                onChange={this.LNameChangeHandler}
                placeholder='Last Name'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='date'
                className='form-control'
                name='join_date'
                onChange={this.JDateChangeHandler}
                placeholder='Joining Date'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='date'
                className='form-control'
                name='date_of_birth'
                onChange={this.BDateChangeHandler}
                placeholder='Date Of Birth'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='c_id'
                onChange={this.IdChangeHandler}
                placeholder='Customer ID'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='phone'
                onChange={this.PhoneChangeHandler}
                placeholder='Phone Number'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='sex'
                onChange={this.SexChangeHandler}
                placeholder='Sex '
              />
            </div>
            <br /><div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='address'
                onChange={this.AddressChangeHandler}
                placeholder='Address'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='email'
                className='form-control'
                name='EmailID'
                onChange={this.EmailIDChangeHandler}
                placeholder='EmailID'
                required
              />
            </div>

            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='password'
                className='form-control'
                name='createpassword'
                onChange={this.createpasswordChangeHandler}
                placeholder='Password'
                required
              />
            </div>
            <br />
            <div>{UserCreated ? 'Your GrubHub UserID is Created' : ' '} </div>
            <br />
            <div style={{ width: '30%' }}>
              <button className='btn btn-danger' type='submit'>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateUser
