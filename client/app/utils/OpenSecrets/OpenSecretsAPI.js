import React, { Component } from 'react';
import axios from 'axios';
import './secrets.css'
import PieChart from 'react-simple-pie-chart';

class OpenSecretsAPI extends Component {
  constructor(props){  
    super(props)
    this.state = {
    candInfo: [],
    candId: "",
    pieChartData: []
  }
  this.makeApiCall = this.makeApiCall.bind(this)
}

  makeApiCall = (e) =>{
    e.preventDefault();
     const self = this;
      axios.get(`/candSector?candId=${this.props.candId}`)
      .then(response  => {
      
        const candidates = [];
        
        for(let i = 0; i < response.data.response.sectors[0].sector.length; i++ ){
          const constObject = {
            sectorName: response.data.response.sectors[0].sector[i]["$"].sector_name,
            totalAmount: response.data.response.sectors[0].sector[i]["$"].total, 
            color: getRandomColor()
        }
      candidates.push(constObject)
      }

      const pieChartData = candidates.map( sector => {
        return {value:parseInt(sector.totalAmount), key: sector.sectorName, color: sector.color}
      })

        function getRandomColor() {
          let letters = '0123456789ABCDEF';
          let color = '#';
          for (let i=0; i<6; i++){
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }

      this.setState({candInfo: candidates, pieChartData: pieChartData})
      }).catch(function (error){
        console.log(error);
      }).bind(this)
  }
  
  render() {

    return (
      <div>
        <button value="Submit"onClick={this.makeApiCall}></button>
      <div> Name: {this.state.candInfo.name} </div>
     {JSON.stringify(this.state.pieChartData)}

<PieChart
  slices={this.state.pieChartData}
/>
    

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

