import React, { Component } from "react";
//import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
class RestDetails extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
  }
  render() {
    return (
      <div>
        <div class="card text-center">
          <div class="card-header">
            Thanks {localStorage.getItem("username")} ! for placing an order
            with
            {localStorage.getItem("SelectedRestaurant")}
          </div>
          <div class="card-body">
            <h5 class="card-title">Please click here to order more!</h5>
            <p class="card-text">:)</p>
            <a href="/buyer/restorder" class="btn btn-primary">
              HOME
            </a>
          </div>
          <div class="card-footer text-muted">GRUBHUB</div>
        </div>
      </div>
    );
  }
}
export default RestDetails;
