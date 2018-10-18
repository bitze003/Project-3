import React, { Component } from "react";
import "whatwg-fetch";
import Header from "../Header/Header";
import Api from "../Api/Api";
import { PieChart } from 'react-easy-chart';

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
      <PieChart 
          data={[
            { key: 'A', value: 100, color: '#aaac84' },
            { key: 'B', value: 200, color: '#dce7c5' },
            { key: 'C', value: 50, color: '#e3a51a' }
          ]}
      />
      <Header />
        {/* <div style={{ backgroundColor: "#5781F6", paddingTop: 30, paddingBottom: 30 }}>
          <div style={{backgroundColor: "white", width:700, marginLeft: "auto", marginRight: "auto", paddingBottom: 20, borderRadius: 10}}> */}
            <Api />

          </div>
    //     </div>
    //   </div>
    );
  }
}

export default Ballot;
