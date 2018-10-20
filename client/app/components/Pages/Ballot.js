import React, { Component } from "react";
import "whatwg-fetch";
import BallotInformation from '../Partials/BallotInformation/BallotInformation';
import Header from '../Header/Header';

class Ballot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {}

  render() {
    const containerStyle = {
      marginTop: "7%",
      border: "solid black 2px",
      width: "75vw"
    }
    return (

      <div>
        <Header />
        <div className ="container" style={{containerStyle}}>
          <BallotInformation />
        </div>
      </div>
    
    );
  }
}

export default Ballot;

