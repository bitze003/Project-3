import React, { Component }  from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isLoading: true,
      token: '',
      loggedIn: false
    };

    this.logout = this.logout.bind(this);
  };

  componentDidMount() {
  const obj = getFromStorage('Electioneer');
  console.log(obj)
    if (obj && obj.token) {
      this.setState({ loggedIn: true})
      // Verify token
      fetch('/api/account/verify?token=' + obj.token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: obj.token,
              name: obj.name,
              isLoading: false,
              loggedIn: true
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

logout() {
  this.setState({
    isLoading: true,
  });
  const obj = getFromStorage('Electioneer');
  if (obj && obj.token) {
    // Verify token
    fetch('/api/account/logout?token=' + obj.token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          localStorage.clear();
          this.setState({
            token: '',
            isLoading: false,
            firstName: '',
            loggedIn: false
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
      height: '50px'
    }
    return (
      <div>
          {(!this.state.loggedIn) ? (
        <nav className="navbar navbar-expand-sm navbar-light bg-light" style={navStyle}>
          <div className="container">
            <a className="navbar-brand" href="/Login">Electioneer</a>
          </div>
        </nav>
      ):(
        <div>
          <nav className="navbar navbar-expand-sm navbar-light bg-dark" style={navStyle}>
            <div className="container">
              <a className="navbar-brand text-white" href="/Home"> Electioneer </a>
              <div class="dot"></div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav " >
                  <li className="nav-item">
                    <a className="nav-link text-white" href="/Ballot">My Ballot</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="/Polling">Polling Place</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <a className="dropdown-item" href="#">Profile</a>
                      <a className="dropdown-item" href="/" onClick={this.logout}>Sign Out</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
      )  
    }
};

export default Header;
