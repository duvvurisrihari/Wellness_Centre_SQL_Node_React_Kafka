import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'material-ui'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
class RestaurantOrderDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      x: 1,
      searchtext: '',
      item: [],
      failed: ''
    }
    this.itemsearch = this.itemsearch.bind(this)
    this.search = this.search.bind(this)
  }
  /* async componentDidMount() {
    var x = [];
    console.log("search clicked");
    await axios
      .get(`http://localhost:3100/items/${this.state.searchtext}`)
      .then(response => {
        console.log("Onclick");
        console.log(response.data);
        var y = response.data.length;
        for (let i = 0; i < y; i++) x.push(JSON.stringify(response.data[i]));
      });
    console.log("Here" + this.state.item);
    this.setState({ item: x });
  } */
  itemsearch = e => {
    this.setState({ searchtext: e.target.value })
    console.log(this.state.searchtext)
  }
  GotoRestDetails = e => {
    e.preventDefault()
    localStorage.setItem('SelectedRestaurant', e.target.value)
    this.props.history.push('/buyer/restdetails')
  }
  async search (e) {
    e.preventDefault()
    console.log('search clicked')
    var x = []
    console.log('search clicked')
    await axios
      .get(`http://localhost:3100/items/${this.state.searchtext}`)
      .then(response => {
        console.log('Onclick')
        console.log(response.data)
        if (response.data == 'No Such item') {
          this.setState({ failed: 'true' })
        } else {
          var y = response.data.length
          for (let i = 0; i < y; i++) x.push(JSON.stringify(response.data[i]))
        }
      })
    console.log('Here' + this.state.item)
    this.setState({ item: x })
    console.log(this.props)
  }

  render () {
    let redirectVar = null
    if (!cookie.load('cookie')) {
      console.log('checking redirection')
      console.log(cookie.load('cookie'))
      redirectVar = <Redirect to='/buyer/login' />
    }
    console.log('Should be empty' + this.state.item)
    var failed = null
    if (this.state.failed == 'true') {
      failed = 'No Such item'
    }
    return (
      <div>
        <div>
          {redirectVar}
          <div class='jumbotron'>
            <nav class='navbar navbar-light bg-light'>
              <form class='form-inline'>
                <input
                  class='form-control mr-sm-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                  onChange={this.itemsearch}
                />

                <button
                  class='btn btn-outline-success my-2 my-sm-0'
                  type='submit'
                  onClick={this.search}
                >
                                          Search
                </button>
              </form>
            </nav>
          </div>
          <p />
        </div>
        <p> {failed}</p>
        <h2>Item Details</h2>;
        <table class='table'>
          <thead>
            <tr>
              <th scope='Restaurant'>
                Restaurants which have {this.state.searchtext}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.item.map(it => (
              <tr>
                <button
                  className='table table-light m-3'
                  id={JSON.parse(it).restid}
                  value={JSON.parse(it).RestaurantName}
                  onClick={this.GotoRestDetails}
                >
                  {JSON.parse(it).RestaurantName}
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default RestaurantOrderDetails
