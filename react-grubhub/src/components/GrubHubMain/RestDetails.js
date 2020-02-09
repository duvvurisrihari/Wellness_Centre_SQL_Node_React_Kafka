import React, { Component } from 'react'
// import "../../App.css";
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
class RestDetails extends Component {
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      nameOfRestaurant: localStorage.getItem('SelectedRestaurant'),
      ITEMLIST: [],
      total: 0
    }
    // Bind the handlers to this class
    this.calculate = this.calculate.bind(this)
    this.addtocart = this.addtocart.bind(this)
    this.placeorder = this.placeorder.bind(this)
    this.insert = this.insert.bind(this)
  }
  async componentWillUnmount () {
    console.log('leaving')
    localStorage.setItem('cart', JSON.stringify(this.state.ITEMLIST))
  }
  componentDidMount () {
    var x = []
    console.log(this.state.nameOfRestaurant)
    axios
      .get(`http://localhost:3100/restitems/${this.state.nameOfRestaurant}`)
      .then(response => {
        console.log('Onclick')
        console.log(response.data)
        this.setState({ ITEMLIST: response.data })
        /* var y = response.data.length;
        for (let i = 0; i < y; i++) x.push(JSON.stringify(response.data[i])); */
      })
    console.log('state' + this.state.ITEMLIST)
  }
  calculate = e => {
    var arrayOb = this.state.ITEMLIST
    var x = e.target.id
    console.log(x + 'targetid')
    for (var i in arrayOb) {
      if (arrayOb[i].itemname === e.target.id) {
        console.log(arrayOb[i])
        arrayOb[i].count = e.target.value
        console.log('Index found' + i)
      }
    }
    this.setState({ ITEMLIST: arrayOb })
    var index1 = this.state.ITEMLIST.indexOf(
      this.state.ITEMLIST.filter(i => i.itemname === x)
    )
    console.log(index1)
  }
  addtocart = e => {
    e.preventDefault()
    var arraycalc = this.state.ITEMLIST
    let total = 0
    for (let i = 0; i < arraycalc.length; i++) {
      total += arraycalc[i].price * arraycalc[i].count
    }
    console.log(total)
    this.setState({ total })
    if (this.state.total > 0) {
      this.setState({ enableorder: 'true' })
      console.log(this.state.enableorder)
    } else {
      this.setState({ enableorder: 'false' })
    }
  }
  placeorder = e => {
    e.preventDefault()
    console.log('creating order')
    localStorage.setItem('cart', JSON.stringify(this.state.ITEMLIST))
    const data = {
      placedby: localStorage.getItem('username'),
      userid: localStorage.getItem('userid'),
      RestaurantName: localStorage.getItem('SelectedRestaurant'),
      placeditem: localStorage.getItem('cart')
    }
    console.log(data)
    axios.post(`http://localhost:3100/createorder/`, data).then(response => {
      console.log(response.data.orderid)
      var manOrderid = response.data.orderid + 1
      console.log(manOrderid)
      console.log(response.data.orderid + 'here here here')
      localStorage.setItem('orderid', manOrderid)
    })
    setTimeout(this.insert, 3000)
  }
  insert = e => {
    console.log('leaving')
    localStorage.setItem('cart', JSON.stringify(this.state.ITEMLIST))
    var arraysave = this.state.ITEMLIST
    for (let i = 0; i < arraysave.length; i++) {
      if (arraysave[i].count != 0) {
        let data = {
          orderid: localStorage.getItem('orderid'),
          itemname: arraysave[i].itemname,
          quantity: arraysave[i].count
        }
        axios
          .post(`http://localhost:3100/insertorder/`, data)
          .then(response => {
            console.log(i)
            console.log(response.data)
          })
      }
    }
    this.props.history.replace('/buyer/orderplaced')
  }
  render () {
    return (
      <div>
        <form>
          <div class='card text-center'>
            <h1 className='btn-danger m-2'>
              {localStorage.getItem('SelectedRestaurant')} RESTAURANT
            </h1>
          </div>
          <table class='table'>
            <thead>
              <tr>
                <th scope='Restaurant'>ITEMS</th>
                <th>DESCRIPTION </th>
                <th>PRICE </th>
                <th>QUANTITY</th>
                <th>COST</th>
              </tr>
            </thead>
            <tbody>
              {this.state.ITEMLIST.map(it => (
                <tr key={it.itemname}>
                  <td>{it.itemname}</td>
                  <td>{it.description}</td>
                  <td>{it.price}</td>
                  <td>
                    <input
                      id={it.itemname}
                      type='number'
                      min='0'
                      max='10'
                      onChange={this.calculate}
                    />
                  </td>
                  <td>{it.count * it.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div align='center'>
            <button className='btn btn-success m-2' onClick={this.addtocart}>
              GET AMOUNT FOR ALL ITEMS
            </button>

            <span className='btn  m-2'>AMOUNT PAYABLE: {this.state.total}</span>
          </div>
          <div align='center'>
            <button className='btn btn-danger m-2' onClick={this.placeorder}>
              ADD TO CART
            </button>
          </div>
        </form>
      </div>
    )
  }
}
export default RestDetails
