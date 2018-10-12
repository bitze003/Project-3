import React, { Component } from 'react';
import 'whatwg-fetch';

import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';
import OpenSecretsAPI from '../../utils/OpenSecrets/OpenSecretsAPI';

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
            <OpenSecretsAPI />
        </div>
        )
    }
}

export default Home;