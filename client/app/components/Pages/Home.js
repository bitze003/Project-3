import React, { Component } from 'react';
import 'whatwg-fetch';
import Map from '../Map/Map';


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