import React, { Component } from "react";
import axios from "axios";
import API from '../../utils/API';
import cid from "../../utils/OpenSecrets/cid"
// import openSecrets from '../../utils/OpenSecrets'
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
import OpenSecretsAPI from "../../utils/OpenSecrets/OpenSecretsAPI";

class Api extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      contests: [],
      candId
    
    };
    this.retrieveCandadites = this.retrieveCandadites.bind(this);
    
  }

  retrieveCandadites() {
    var houseNumber = "1112";
    var address = "W25th";
    var addressType = "st";
    var city = "Minneapolis";
    var state = "MN";

    var queryURL =
      "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyCXwoG3eT07HmPYzM402gKblv-_KJWL3jo&address=" +
      houseNumber +
      "%20" +
      address +
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
      .then(function(response) {
        console.log(response.data);
        self.setState({ contests: response.data.contests });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.retrieveCandadites();

    const obj = getFromStorage('Electioneer');
    const houseNumber = obj.houseNumber;
    const streetName = obj.streetName;
    const addressType = obj.addressType;
    const city = obj.city;
    const state = obj.state;
    // get info from google civic info api
    API.getInformation(houseNumber, streetName, addressType, city, state)
    .then((res) => {
        console.log(res)
        const earlyVote = res.data.earlyVoteSites
        this.setState({
            electionName: res.data.election.name,
            electionDate: res.data.election.electionDay,
            earlyVoting: earlyVote,
        });
    })
    .catch(err => console.log(err));
  }
    loadOpenSecrets(event){
      const candidateName = event.target.innerText
     const formateName = (name) => {
       let nameArray = name.split (" ")
        .reverse()
        .toString()
        .replace(",", ", ");
        
      return (nameArray)
      console.log(event.target.innerText)
     }
     const formattedCandidateName = formateName(candidateName);

     const candidateIds = cid.filter ((candidate)=> {
        return (candidate.CRPName == formattedCandidateName);
     });
     if (! candidateIds.length > 0) 

      return;
      const realCandidateId = candidateIds[0].CID
     
     
     console.log(formateName(candidateName))
     console.log(realCandidateId)
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
                    <div
                      // style={{
                      //   width: 550,
                      //   backgroundColor: "#F65757",
                      //   marginTop: 20,
                      //   paddingTop: 1,
                      //   borderRadius: 10,
                      //   marginLeft: "auto",
                      //   marginRight: "auto",
                      //   fontFamily: "'Frank Ruhl Libre', serif"
                      // }}
                      className="panel-heading "
                      role="tab"
                      id={"heading" + i}
                    >
                      <h1
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
                          // style={{
                          //   color: "black",
                          //   paddingLeft: 15,
                          //   paddingRight: 15,
                          //   paddingTop: 20
                          // }}
                        >
                          {contests.office}
                        </a>
                        <hr style={{ width: "90%" }} />
                      </h1>

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
                            ><OpenSecretsAPI candId={this.state.candId} />
                              
                              <div className="panel-body">
                                {" "}
                                <h3 onClick={this.loadOpenSecrets}
                                
                                  // style={{
                                  //   textDecoration: "underline",
                                  //   marginLeft: 20
                                  // }}
                                >
                                  {candidate.name}
                                </h3>{" "}
                                <h4 style={{ marginLeft: 20 }}>
                                  {candidate.party}
                                </h4>{" "}
                                <h4 style={{ marginLeft: 20 }}>
                                  <a
                                    href={candidate.candidateUrl}
                                    target="blank"
                                  >
                                    {candidate.candidateUrl}
                                  </a>
                                </h4>
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