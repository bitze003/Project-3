import React, { Component } from "react";
import axios from "axios";
import API from '../../utils/API';
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Api extends Component {
  constructor(props) {
    super(props);
    this.state = { contests: [] };
    this.retrieveCandadites = this.retrieveCandadites.bind(this);
  }

  retrieveCandadites() {
    const obj = getFromStorage('Electioneer');
    console.log(obj);
    const houseNumber = obj.houseNumber;
    const streetName = obj.streetName;
    const addressType = obj.addressType;
    const city = obj.city;
    const state = obj.state;

    var queryURL =
      "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyCXwoG3eT07HmPYzM402gKblv-_KJWL3jo&address=" +
      houseNumber +
      "%20" +
      streetName +
      "%20" +
      addressType +
      "S%20City%20" +
      city +
      "%20" +
      state +
      "&electionId=6000";

    const self = this;
    axios
      .get(queryURL)
      .then(function (response) {
        console.log(response.data);
        self.setState({ contests: response.data.contests });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.retrieveCandadites();
  }

  render() {
    return (
      <div
        //style={{ fontFamily: "'Work Sans', sans-serif" }}
        className="panel-group"
        id="accordion"
        role="tablist"
        aria-multiselectable="true"
      //style={{ paddingTop: 30 }}
      >
        <div className="panel panel-default"> 
          <div>
            {this.state.contests
              ? this.state.contests.map((contests, i) => {
                return (
                  <div className="container"
                    style={{
                      width: "70vw",
                      marginTop: 20,
                      paddingTop: 1,
                      marginLeft: "auto",
                      marginRight: "auto",
                      paddingTop: 15,
                      paddingRight: 0,
                      textAlign: "center",
                      borderBottom: "solid black 1px",
                    }}
                    className="panel-heading "
                    role="tab"
                    id={"heading" + i}
                  >
                    <a
                      //style={{ textAlign: "center", fontSize: 42 }}
                      className="panel-title"
                    >
                      <a
                        id={"headerLink" + i}
                        role="button"
                        data-toggle="collapse"
                        data-target={".multi-collapse" + i}
                        data-parent="#accordion"
                        href={"#headLink" + i}
                        aria-expanded="false"
                        aria-controls={"collapse" + i}
                        className="office"
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          paddingBottom: 20,
                          lineHeight:3
                        }}
                      >
                        {contests.office}
                      </a>

                    </a>

                    {contests.candidates ? (
                      contests.candidates.map(candidate => {
                        return (
                          <div
                            id={"collapse" + i}
                            // style={{
                            //   width: 550,
                            //   backgroundColor: "#F65757",
                            //   marginTop: -10,
                            //   paddingBottom: 20,
                            //   borderRadius: 10,
                            //   marginLeft: "auto",
                            //   marginRight: "auto",
                            //   fontFamily: "'Frank Ruhl Libre', serif"
                            // }}
                            className={
                              "panel-collapse multi-collapse collapse multi-collapse" +
                              i
                            }
                            role="tabpanel"
                            aria-labelledby={"#heading" + i}
                          >

                            <div className="panel-body">
                              {" "}
                              <p
                              // style={{
                              //   textDecoration: "underline",
                              //   marginLeft: 20
                              // }}
                              >
                                {candidate.name}
                              </p>{" "}
                              <p style={{ marginLeft: 20 }}>
                                {candidate.party}
                              </p>{" "}
                              <p style={{ marginLeft: 20 }}>
                                <a
                                  href={candidate.candidateUrl}
                                  target="blank"
                                >
                                  {candidate.candidateUrl}
                                </a>
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                        <div
                          id={"collapse" + i}
                          // style={{
                          //   width: 500,
                          //   backgroundColor: "#F65757",
                          //   marginTop: 20,
                          //   paddingBottom: 20,
                          //   borderRadius: 10,
                          //   marginLeft: "auto",
                          //   marginRight: "auto",
                          //   fontFamily: "'Frank Ruhl Libre', serif"
                          // }}
                          className={
                            "panel-collapse multi-collapse collapse multi-collapse" +
                            i
                          }
                          role="tabpanel"
                          aria-labelledby={"#heading" + i}
                        >

                          <div
                            className="panel-body"
                          // style={{
                          //   fontFamily: "'Work Sans', sans-serif",
                          //   margin: 20
                          // }}
                          >
                            {" "}
                            <h4>{contests.referendumText}</h4>
                          </div>
                        </div>
                      )}
                  </div>
                );
              })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Api;