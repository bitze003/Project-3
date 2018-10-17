import React, { Component } from 'react';
// import './App.css';
import axios from 'axios';
import {PieChart} from 'react-easy-chart';
import './secrets.css'
//change candinfo from {} to a []
class OpenSecretsAPI extends Component {
  constructor(props){  
    super(props)
    this.state = {
    candInfo: [],
    candId: "",
    pieChartData: [{}]
  }
  this.makeApiCall = this.makeApiCall.bind(this)
}
  makeApiCall = (e) =>{
    e.preventDefault();
    console.log('button pressed');
    const self = this;
    axios.all([
      axios.get(`/candinfo?candId=${this.props.candId}`),
      axios.get(`/candindustry?candId=${this.props.candId}`),
      axios.get(`/candSector?candId=${this.props.candId}`)
    ])
      .then (axios.spread((infores, industryres, sectorres)  => {
        // r = JSON.parse(r.trim());
        console.log(infores);
        console.log(industryres);
        console.log(sectorres);
        const candidates = [];
        for(let i = 0; i < sectorres.data.response.sectors[0].sector.length; i++ ){
        const constObject = {
          
          name: infores.data.response.summary[0]["$"].cand_name,
          sectorName: sectorres.data.response.sectors[0].sector[i]["$"].sector_name,
          amount: sectorres.data.response.sectors[0].sector[i]["$"].total, 
          totalAmount: sectorres.data.response.sectors[0].sector[i]["$"].total 
          
        }
        candidates.push(constObject)
        // self.setState({candInfo: constObject})
      }

      console.log(candidates)
      const pieChartData = candidates.map( sector => {
        return {key: sector.sectorName, value:parseInt(sector.totalAmount)}
      })
      console.log(pieChartData);
      self.setState({candInfo: candidates, pieChartData: pieChartData})
      
      }));

      
  }


  render() {
    // console.log(this.state.candInfo)
    return (
      <div>
        <input type="submit" value="Submit"onClick={this.makeApiCall}></input>
      <div> Name: {this.state.candInfo.name} </div>
      {this.state.pieChartData.map(item => {
      <PieChart 
       key = {item.key}
       sector = {item.key}
       totalAmount = {item.value}
       />
      })}

      <div>{this.state.candInfo ? this.state.candInfo.map(cand => {
        return(
          <p>Industry Name: {cand.sectorName}<br></br> Total Amount $: {cand.totalAmount} </p>
        )
    
      })
    : ""}</div>
      </div>
    );
    
  }
}

export default OpenSecretsAPI;

