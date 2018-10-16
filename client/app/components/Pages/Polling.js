import React, { Component } from "react";
import "whatwg-fetch";

import Polling from "../Partials/PollingLocation/PollingLocation";
import Map from "../Partials/Map/Map";
import Header from '../Header/Header';
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
