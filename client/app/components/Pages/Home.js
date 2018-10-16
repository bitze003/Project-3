import React, { Component } from 'react';
import 'whatwg-fetch';
import API from '../../utils/API';
import { Redirect } from 'react-router-dom';
import EarlyVoting from '../Partials/EarlyVoting/EarlyVoting'
import Header from '../Header/Header'
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
            token: ''
        };
    }
   
    componentDidMount() {
        const obj = getFromStorage('Electioneer');
        if (obj && obj.token) {
            const houseNumber = obj.houseNumber;
            const streetName = obj.streetName;
            const addressType = obj.addressType;
            const city = obj.city;
            const state = obj.state;
            const tkn = obj.token
            // get info from google civic info api
            API.getInformation(houseNumber, streetName, addressType, city, state)
            .then((res) => {
                console.log(res)
                const earlyVote = res.data.earlyVoteSites
                this.setState({
                    electionName: res.data.election.name,
                    electionDate: res.data.election.electionDay,
                    earlyVoting: earlyVote,
                    token: tkn
                });
            })
            .catch(err => console.log(err));
        }
    }
    
    render() {
        const sizeOfEarlyVoting = this.state.earlyVoting.filter(member => member)
        const numEarlyVotingLocations = sizeOfEarlyVoting.length
        const centerStyle = {
            textAlign: 'center',
            marginTop: '15px'
        } 
        const inline = {
            display: 'inline'
        }
        const headerStyle = {
            textAlign: 'center',
            margin: '20px'
        }
        const electionTitle = {
            textAlign: 'center',
        }
        const backgroundColor = {
            backgroundColor: 'white'
        }
        
        return (
        <div>
        <Header />
        <div className="container" style={backgroundColor}>
        
        <hr />
            <h5 style={headerStyle}>Upcoming Election:</h5>
            <h4 style={electionTitle}>
                <div style={centerStyle}>{this.state.electionName}</div>
                <div style={centerStyle}>{moment(this.state.electionDate).format('LLLL')}</div>
            </h4>
            <hr />
            <h3>Early Voting!</h3>
            <h6>You have <strong style={inline}>{numEarlyVotingLocations}</strong> locations for early voting.</h6>
            <hr />
            {this.state.earlyVoting.map( item => (
                <EarlyVoting 
                key = {item.address.locationName}
                address = {item.address}
                pollingHours = {item.pollingHours.split(/(\r\n|\n|\r)/gm)}
                startDate = {item.startDate}
                endDate = {item.endDate}
            />
            ))}
            </div>
        </div>)
    }
}

export default Home;