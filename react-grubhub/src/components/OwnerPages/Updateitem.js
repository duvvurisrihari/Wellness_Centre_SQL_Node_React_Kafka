import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
class Updateitem extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    var itemtobeUpdated = JSON.parse(localStorage.getItem("updateitem"));
    this.state = {
      price: itemtobeUpdated.price,
      description: itemtobeUpdated.description,
      itemname: itemtobeUpdated.itemname
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(event.target.id);
  };
  updateItem = event => {
    event.preventDefault();
    var initial = JSON.parse(localStorage.getItem("updateitem"));
    console.log(this.state.itemname);
    var data = {
      price: this.state.price,
      description: this.state.description,
      itemname: this.state.itemname,
      restid: localStorage.getItem("restid"),
      initial: initial.itemname
    };
    console.log(data);
    axios.post(`http://localhost:3100/updateitem/`, data).then(response => {
      console.log("In Update");
      console.log(response.data);
      if (response.data == "Success") {
        this.props.history.push("/owner/additems");
      }
    });
  };
  render() {
    let redirectVar = null;

    if (!cookie.load("owner")) {
      console.log("checking redirection");
      redirectVar = <Redirect to="/owner/ownerlogin" />;
    }
    return (
      <div>
        {redirectVar}
        <form>
          <table class="table">
            <thead>
              <tr>
                <th scope="Restaurant">ITEMS</th>
                <th>DESCRIPTION </th>
                <th>PRICE </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    id="itemname"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.itemname}
                    required
                  ></input>
                </td>
                <td>
                  <input
                    id="description"
                    type="text"
                    value={this.state.description}
                    onChange={this.handleChange}
                    required
                  ></input>
                </td>
                <td>
                  <input
                    id="price"
                    type="number"
                    value={this.state.price}
                    onChange={this.handleChange}
                    required
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <div align="center">
            <button
              className="btn btn-primary m-2"
              onClick={this.updateItem}
              type="submit"
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Updateitem;
