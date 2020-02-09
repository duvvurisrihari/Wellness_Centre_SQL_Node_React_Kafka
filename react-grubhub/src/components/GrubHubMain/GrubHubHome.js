import React, { Component } from "react";
import cookie from "react-cookies";
//import Bootstrap from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import GHNav from "./GHNav";
import CentralContent from "./CentralContent";

export default class GrubHubHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <CentralContent />
      </React.Fragment>
    );
  }
}
