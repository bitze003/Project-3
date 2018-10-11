import React, { Component } from 'react';
import 'whatwg-fetch';
import API from '../../utils/API';
import EarlyVoting from '../Partials/EarlyVoting/EarlyVoting'

import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';

class Home extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: true,
            electionName: '',
            electionDate: '',
            earlyVoting: [],
        };
    }

    componentDidMount() {
        const obj = getFromStorage('Electioneer');
        const houseNumber = obj.houseNumber;
        const streetName = obj.streetName;
        const addressType = obj.addressType;
        const city = obj.city;
        const state = obj.state;
        
        API.getInformation(houseNumber, streetName, addressType, city, state)
        .then((res) => {
            const earlyVote = res.data.earlyVoteSites
            this.setState({
                electionName: res.data.election.name,
                electionDate: res.data.election.electionDay,
                earlyVoting: earlyVote,
            });
        })
        .catch(err => console.log(err));
    }
    
    render() {
        const sizeOfEarlyVoting = this.state.earlyVoting.filter(member => member)
        const numEarlyVotingLocations = sizeOfEarlyVoting.length
        const centerStyle = {
            textAlign: 'center'
        }
      
        return(
        <div className="container">
        <h1>Home Page</h1> 
            <h4>{this.state.electionName}</h4>
            <h6>{this.state.electionDate}</h6>
            <h6 style={centerStyle}>Early Voting!</h6>
            <h6>You have <strong>{numEarlyVotingLocations}</strong> locations to early vote.</h6>
            {this.state.earlyVoting.map( item => (
                <EarlyVoting 
                key = {item.address.locationName}
                address = {item.address}
                pollingHours = {item.pollingHours.split(/(\r\n|\n|\r)/gm)}
                startDate = {item.startDate}
                endDate = {item.endDate}
            />
            ))}
    
            {/* <Map/> */}
        </div>
        )
    }
}

export default Home;