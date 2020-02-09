import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
class AllOrderstoRestaurant extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nameOfRestaurant: localStorage.getItem('RestaurantName'),
      list: [],
      items: [],
      selectValue: ''
    }
    this.getdetails = this.getdetails.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount () {
    axios
      .get(`http://localhost:3100/allrestorders/${this.state.nameOfRestaurant}`)
      .then(response => {
        console.log('Onclick')
        console.log(response.data)
        this.setState({ list: response.data })
      })
  }
  getdetails (it) {
    var items = []
    console.log(it.placeditem)
    var x = JSON.parse(it.placeditem)
    console.log(x)

    for (let i = 0; i < x.length; i++) {
      if (x[i].count != 0) {
        console.log(x[i].itemname)
        var data = {
          itemname: x[i].itemname,
          quantity: x[i].count,
          change: 'false'
        }
        items.push(data)
      }
    }
    this.setState({ items })
  }
  handleChange = e => {
    e.preventDefault()
    this.setState({ selectValue: e.target.id })
    var data = {
      orderstatus: e.target.value,
      orderid: e.target.id
    }
    console.log(data)
    axios
      .post(`http://localhost:3100/updateorderstatus/`, data)
      .then(response => {
        console.log('updateorderstatus')
        console.log(response.data)
        console.log(this.state.change)
        setTimeout(() => {}, 3000)

        this.setState({ change: 'false' })
      })
    window.location.reload()
  }
  render () {
    let redirectVar = null

    if (!cookie.load('owner')) {
      console.log('checking redirection')
      redirectVar = <Redirect to='/owner/ownerlogin' />
    }

    return (
      <div>
        {redirectVar}
        <table class='table'>
          <thead class='thead-dark'>
            <tr>
              <th scope='Restaurant'>ORDERID</th>
              <th>PLACED BY </th>
              <th>ORDER STATUS</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(it => (
              <tr key={it.orderid}>
                <td>{it.orderid}</td>
                <td>{it.placedby}</td>
                <td>{it.orderstatus}</td>
                <td>
                  <button
                    id={it.orderid}
                    className='btn btn-danger m-2'
                    onClick={() => this.getdetails(it)}
                  >
                                        GET ORDER DETAILS
                  </button>
                </td>
                <td>
                  <select
                    id={it.orderid}
                    placeholder='Order Status'
                    class='class="btn btn-warning'
                    value={this.state.selectValue}
                    onChange={this.handleChange}
                  >
                    <option value='Placed'>Placed</option>
                    <option value='Cancel'>Cancel</option>
                    <option value='Delivered'>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table class='table table-dark'>
          {this.state.items.map(it => (
            <tr>
              <td m-2>{it.itemname}</td>
              <td>{it.quantity}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

export default AllOrderstoRestaurant
