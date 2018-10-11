import React, { Component } from 'react';
// import './App.css';

import axios from 'axios';

class OpenSecretsAPI extends Component {
    state = {
    candInfo: {}
  }
  
  makeApiCall = (e) =>{
    e.preventDefault();
    console.log('button pressed');
    axios.all([
      axios.get('/candinfo'),
      axios.get('/candindustry'),
      axios.get('/candSector')
    ])
      .then (axios.spread((infores, industryres, sectorres)  => {
        // r = JSON.parse(r.trim());
        console.log(infores);
        console.log(industryres);
        console.log(sectorres);
        this.setState(({ candInfo }) => {
          candInfo.name = infores.data.response.summary[0]["$"].cand_name;
          candInfo.cash_on_hand = infores.data.response.summary[0]["$"].cash_on_hand;
          candInfo.candIndustry = industryres.data.response.industries[0].industry[0]["$"].industry_name;
          candInfo.candSector = sectorres.data.response.sectors[0].sector[0]["$"].sector_name;
          
          return {candInfo};
        });
      }));
  }
  render() {
    return (
      <div>
        <input type="submit" value="Submit"onClick={this.makeApiCall}></input>
      <div> Name: {this.state.candInfo.name} </div>
      <div>Cash on hand:{this.state.candInfo.cash_on_hand} </div>
      <div>Industry: {this.state.candInfo.candIndustry}</div>
      <div>Sector Name: {this.state.candInfo.candSector}</div>
      </div>
    );
  }
}

export default OpenSecretsAPI;
