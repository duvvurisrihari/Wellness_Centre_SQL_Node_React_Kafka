import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
class UserOrderDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userid: localStorage.getItem('userid'),
      list: [],
      items: [],
      selectValue: ''
    }
    this.getdetails = this.getdetails.bind(this)
  }
  componentDidMount () {
    axios
      .get(`http://localhost:3100/userorders/${this.state.userid}`)
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

  render () {
    let redirectVar = null

    if (!cookie.load('cookie')) {
      console.log('checking redirection')
      redirectVar = <Redirect to='/buyer/login' />
    }

    return (
      <div>
        {redirectVar}
        <table class='table'>
          <thead class='thead-dark'>
            <tr>
              <th scope='Restaurant'>ORDERID</th>
              <th>ORDERED FROM </th>
              <th>ORDER STATUS</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(it => (
              <tr key={it.orderid}>
                <td>{it.orderid}</td>
                <td>{it.RestaurantName}</td>
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

export default UserOrderDetails
