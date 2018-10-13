import React, { Component }  from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.firstName,
      isLoggedIn: false,
      isLoading: true,
      token: '',
    };

    // this.logout = this.logout.bind(this);
  };

  componentDidMount() {
  const obj = getFromStorage('Electioneer');
    if (obj && obj.token) {
    
      // Verify token
      fetch('/api/account/verify?token=' + obj.token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: obj.token,
              name: obj.name,
              isLoading: false,
              isLoggedIn: true
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
}

  render () {

    const navStyle = {
      height: '52px'
    }
   
      return (
    
        <div>
          <nav className="navbar navbar-expand-sm navbar-light bg-light" style={navStyle}>
            <div className="container">
              <a className="navbar-brand" href="/Home">Electioneer</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav" >
                  <li className="nav-item">
                    <a className="nav-link" href="./Ballot">My Ballot</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="./Polling">Polling Place</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle"  href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <a className="dropdown-item" href="#">Profile</a>
                      <a className="dropdown-item" href="/" onClick={this.props.logout}>Sign Out</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }
};

export default Header;
