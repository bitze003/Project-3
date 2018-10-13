import React, { Component } from "react";
import "whatwg-fetch";
import Header from "../Header/Header";
import Polling from "../Polling/Polling";
import Map from "../Map/Map";

import { getFromStorage, setInStorage } from "../../utils/storage";

class Ballot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Header />
        <div className="jumbotron row" id="pollingJumbo">
          <Map />
          <Polling />
        </div>
      </div>
    );
  }
}

export default Ballot;
