import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header';
import Api from '../Api/Api';

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
            <h1>Ballot Page</h1>
            <Api />
        </div>
        )
    }
}

export default Ballot;