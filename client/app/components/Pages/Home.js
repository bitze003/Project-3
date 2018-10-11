import React, { Component } from 'react';
import 'whatwg-fetch';
<<<<<<< HEAD
import API from '../../utils/API';
=======
import Map from '../Map/Map';

>>>>>>> master

import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';

class Home extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: true,
        };
    }

    componentDidMount() {
<<<<<<< HEAD
        const obj = getFromStorage('Electioneer');
        const houseNumber = obj.houseNumber;
        const streetName = obj.streetName;
        const addressType = obj.addressType;
        const city = obj.city;
        const state = obj.state;
        
        API.getInformation(houseNumber, streetName, addressType, city, state)
        .then((res) => {
            console.log(res);
        })
        .catch(err => console.log(err));
=======
       
>>>>>>> master
    }
    
    render() {
        return(
        <div className="container">
            <h1>Home Page</h1> 
            <Map/>
        </div>
        )
    }
}

export default Home;