import React, { Component } from 'react';
import axios from 'axios';
import PieChart from 'react-simple-pie-chart';
import OpenSecretsAPI from '../../../utils/OpenSecrets/OpenSecretsAPI';

class OpenSecrets extends Component {
  constructor(props){  
    super(props)
    this.state = {
    candInfo: [],
    candId: "",
    pieChartData: []
  }
}

  makeApiCall = (e) =>{
    e.preventDefault();
    console.log(this.props.candId)
      OpenSecretsAPI.getFinancials(this.props.candId)
      .then((response)  => {
        const candidates = [];
        const pieChartData = [];
        for(let i = 0; i < response.data.response.sectors[0].sector.length; i++ ){
          const constObject = {
            sectorName: response.data.response.sectors[0].sector[i]["$"].sector_name,
            totalAmount: response.data.response.sectors[0].sector[i]["$"].total, 
            color: getRandomColor()
        }
        candidates.push(constObject)
        console.log(candidates)
        this.setState({candInfo: candidates})
        const getRandomColor = () => {
          let letters = '0123456789ABCDEF';
          let color = '#';
          for (let i=0; i<6; i++){
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
      }

      pieChartData = this.state.candidates.map( sector => {
        return {value:parseInt(sector.totalAmount), key: sector.sectorName, color: sector.color}
      })

        

      this.setState({pieChartData: pieChartData})
      }).catch((error) => {
        console.log(error);
      });
    };
  
  render() {

    return (
      <div>
        <button value="Submit" onClick={this.makeApiCall}></button>
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

export default OpenSecrets;
