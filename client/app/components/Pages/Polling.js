import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header';
import Polling from '../Polling/Polling';

import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';

class Ballot extends Component {
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
            <Header />
            <h1>Polling Page</h1>

            <Polling />
            
        </div>
        )
    }
}

export default Ballot;