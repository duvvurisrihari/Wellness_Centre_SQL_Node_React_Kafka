import React, { Component } from 'react'
import axios from 'axios'
// import cookie from "react-cookies";
// import { Redirect } from "react-router";

class CreateOwner extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      Fname: '',
      Mname:'',
      Lname:'',
      sal:'',
      jdate:'',
      e_id:'',
      ssn:'',
      address:'',
      type:'',
      m_ssn:'',
      b_id:'',  
      EmailID: '',
      createpassword: '',
      existsFlag: false
    }
    // Bind the handlers to this class
    this.submitCreate = this.submitCreate.bind(this)
    this.NameChangeHandler = this.NameChangeHandler.bind(this)
    this.EmailIDChangeHandler = this.EmailIDChangeHandler.bind(this)
    this.createpasswordChangeHandler = this.createpasswordChangeHandler.bind(this)

  }
  // Name change handler to update state variable with the text entered by the user
  NameChangeHandler = e => {
    this.setState({
      Fname: e.target.value
    })
    this.setState({
      Mname: e.target.value
    })
    this.setState({
      Lname: e.target.value
    })
    this.setState({
      sal: e.target.value
    })
    this.setState({
      jdate: e.target.value
    })
    this.setState({
      address: e.target.value
    })
  }
  EmailIDChangeHandler = e => {
    this.setState({
      EmailID: e.target.value
    })
    this.setState({
      ssn: e.target.value
    })
    this.setState({
      m_ssn: e.target.value
    })
    this.setState({
      b_id: e.target.value
    })
    this.setState({
      type: e.target.value
    })
    this.setState({
      e_id: e.target.value
    })
  }
  createpasswordChangeHandler = e => {
    this.setState({
      createpassword: e.target.value
    })
  }

  submitCreate = e => {
    if (
      this.state.Name &&
      this.state.EmailID &&
      this.state.createpassword 
    ) {
      var headers = new Headers()
      // prevent page from refresh
      e.preventDefault()
      const data = {
        Fname:this.state.Fname,
        Mname:this.state.Mname,
        Lname:this.state.Lname,
        sal:this.state.sal,
        jdate:this.state.jdate,
        e_id:this.state.e_id,
        ssn:this.state.ssn,
        address:this.state.address,
        type:this.state.type,
        m_ssn:this.state.m_ssn,
        b_id:this.state.b_id,  
        EmailID: this.state.EmailID,
        createpassword: this.state.createpassword
      }
      console.log(data)
      axios.post('http://localhost:3100/ownersignup', data).then(response => {
        // update the state with the response data
        console.log(response.data)
        /* if (response.data == "Book ID exists") {
        this.setState({ existsFlag: true });
      } else {
        this.setState({ existsFlag: false });
      } */
      })
    }
    setTimeout(function () {
      alert('Account Created -Please Login')
    }, 1500)
    //this.props.history.push('/owner/ownerlogin')
  }

  render () {
    const existsFlag = this.state.existsFlag
    let redirectVar = null

    return (
      <div>
        <br />
        <div className='container' align='center'>
          <h1>Staff Sign Up</h1>
          <form onSubmit={this.submitCreate} method='post'>
            {redirectVar}
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='Fname'
                onChange={this.NameChangeHandler}
                placeholder='First Name'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='Mname'
                onChange={this.NameChangeHandler}
                placeholder='Middle Name'
              />
            </div>
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='Lname'
                onChange={this.NameChangeHandler}
                placeholder='Last Name'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='date'
                className='form-control'
                name='jdate'
                onChange={this.NameChangeHandler}
                placeholder='First Name'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='e_id'
                onChange={this.NameChangeHandler}
                placeholder='Employee ID'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='sal'
                onChange={this.NameChangeHandler}
                placeholder='Salary'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='ssn'
                onChange={this.NameChangeHandler}
                placeholder='Social Security Number'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='b_id'
                onChange={this.NameChangeHandler}
                placeholder='Branch ID'
                required='required'
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
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='password'
                className='form-control'
                name='createpassword'
                onChange={this.createpasswordChangeHandler}
                placeholder='createpassword'
                required='required'
              />
            </div>
            <br />
            

            <br />
            <div>{existsFlag ? 'ID exists ' : ' '} </div>
            <br />
            <div style={{ width: '30%' }}>
              <button
                className='btn btn-danger'
                type='submit'
                onClick={this.submitCreate}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateOwner
