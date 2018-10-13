import React, { Component } from 'react';
// import './App.css';

import axios from 'axios';
//change candinfo from {} to a []
class OpenSecretsAPI extends Component {
  constructor(props){  
    super(props)
    this.state = {
    candInfo: []
  }
  this.makeApiCall = this.makeApiCall.bind(this)
}
  makeApiCall = (e) =>{
    e.preventDefault();
    console.log('button pressed');
    const self = this;
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
        for(let i = 0; i < sectorres.data.response.sectors[0].sector.length; i++ ){
        const constObject = {
          
          name: infores.data.response.summary[0]["$"].cand_name,
          // cash_on_hand: infores.data.response.summary[0]["$"].cash_on_hand,
          // candIndustry:industryres.data.response.industries[0].industry[0]["$"].industry_name,
          sectorName: sectorres.data.response.sectors[0].sector[i]["$"].sector_name,
          totalAmount: sectorres.data.response.sectors[0].sector[i]["$"].total  
            
        }
        self.setState({
          candInfo: [...this.state.candInfo, constObject]
        })
        // self.setState({candInfo: constObject})
      }

      }));
  }
  render() {
    console.log(this.state.candInfo)
    return (
      <div>
        <input type="submit" value="Submit"onClick={this.makeApiCall}></input>
      <div> Name: {this.state.candInfo.name} </div>
      <div>{this.state.candInfo ? this.state.candInfo.map(cand => {
        return(
          <h3>Industry Name: {cand.sectorName}<br></br> Total Amount $: {cand.totalAmount} </h3>
        )
    
      })
    : ""}</div>
      </div>
    );
    
  }
}

export default OpenSecretsAPI;
