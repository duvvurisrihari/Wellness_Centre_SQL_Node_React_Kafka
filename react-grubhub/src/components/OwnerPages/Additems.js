import React, { Component } from 'react'
// import "../../App.css";
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
class AddItems extends Component {
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      nameOfRestaurant: localStorage.getItem('RestaurantName'),
      ITEMLIST: [],
      price: '',
      description: '',
      itemname: ''
    }
    this.addToMenu = this.addToMenu.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
  }
  async componentDidMount () {
    await axios
      .get(`http://localhost:3100/restitems/${this.state.nameOfRestaurant}`)
      .then(response => {
        console.log('Onclick')
        console.log(response.data)
        if (response.data != 'No Such item') {
          this.setState({ ITEMLIST: response.data }, () => {
            console.log('new' + this.state.ITEMLIST)
          })
        }
      })
  }
  addToMenu = e => {
    if (this.state.itemname && this.state.description && this.state.price) {
      e.preventDefault()
      var dummy = this.state.ITEMLIST
      var data = {
        itemname: this.state.itemname,
        description: this.state.description,
        price: this.state.price,
        RestaurantName: localStorage.getItem('RestaurantName'),
        restid: localStorage.getItem('restid')
      }
      console.log(data)
      axios.post(`http://localhost:3100/insertitem/`, data).then(response => {
        console.log('Onclick')
        console.log(dummy)
        console.log(response.data)
        if (response.data == 'Success') {
          dummy.push(data)
          this.setState({ ITEMLIST: dummy })
          console.log(dummy)
        }
      })
      this.setState({ itemname: '' })
      this.setState({ description: '' })
      this.setState({ price: '' })
    }
  }
  updateItem (it) {
    localStorage.setItem('updateitem', JSON.stringify(it))
    this.props.history.push('/owner/updateitem')
  }
  deleteItem (it) {
    console.log('In Delete' + it.itemname)
    var array = this.state.ITEMLIST // make a separate copy of the array
    console.log(this.setState.ITEMLIST)
    for (var i in array) {
      if (array[i].itemname === it.itemname) {
        console.log('Index found' + i)
        console.log(array[i])
        array.splice(i, 1)
        this.setState({ ITEMLIST: array })
        console.log(this.setState.ITEMLIST)
        {
          var data = {
            itemname: it.itemname,
            RestaurantName: localStorage.getItem('RestaurantName')
          }
          console.log(data)
          axios
            .post(`http://localhost:3100/deleteitem/`, data)
            .then(response => {
              console.log('Deleted')
              console.log(response.data)
            })
        }
      }
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
    console.log(event.target.id)
  }
  render () {
    let redirectVar = null
    let noitems = null

    if (!cookie.load('owner')) {
      console.log('checking redirection')
      redirectVar = <Redirect to='/owner/ownerlogin' />
    }
    var arr = this.state.ITEMLIST
    console.log('length' + arr.length)
    setTimeout(function () {
      console.log('Going to check length')
    }, 5000)
    if (arr.length === 0) {
      noitems = null
    } else {
      if (this.state && this.state.ITEMLIST) {
        noitems = (
          <table class='table'>
            <thead>
              <tr>
                <th scope='Restaurant'>ITEMS</th>
                <th>DESCRIPTION </th>
                <th>PRICE </th>
              </tr>
            </thead>
            <tbody>
              {this.state.ITEMLIST.map(it => (
                <tr key={it.itemname}>
                  <td>{it.itemname}</td>
                  <td>{it.description}</td>
                  <td>{it.price}</td>
                  <td>
                    <button
                      id={it.itemname}
                      className='btn btn-danger m-2'
                      onClick={() => this.deleteItem(it)}
                    >
                      DELETE
                    </button>
                  </td>
                  <td>
                    <button
                      id={it.itemname}
                      className='btn btn-danger m-2'
                      onClick={() => this.updateItem(it)}
                    >
                      UPDATE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {noitems}
          </table>
        )
      }
    }

    return (
      <div>
        {redirectVar}

        <div class='card text-center'>
          <h1 className='btn-primary m-2'>
            {localStorage.getItem('RestaurantName')} RESTAURANT
          </h1>
        </div>
        <form>
          <table class='table'>
            <thead>
              <tr>
                <th scope='Restaurant'>ITEMS</th>
                <th>DESCRIPTION </th>
                <th>PRICE </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    id='itemname'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.itemname}
                    required='required'
                  />
                </td>
                <td>
                  <input
                    id='description'
                    type='text'
                    value={this.state.description}
                    onChange={this.handleChange}
                    required='required'
                  />
                </td>
                <td>
                  <input
                    id='price'
                    type='number'
                    value={this.state.price}
                    onChange={this.handleChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div align='center'>
            <button
              className='btn btn-primary m-2'
              onClick={this.addToMenu}
              type='submit'
            >
              ADD ITEM TO MENU
            </button>
          </div>
        </form>
        {noitems}
      </div>
    )
  }
}

export default AddItems
