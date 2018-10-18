import React, { Component } from "react";
import axios from "axios";
import API from '../../utils/API';
import cid from "../../utils/OpenSecrets/cid"
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
import OpenSecretsAPI from "../../utils/OpenSecrets/OpenSecretsAPI";
import Modal from "../Modal/Modal";



class Api extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      contests: [],
      candId: "",
      isOpen:false
    
    };
    this.retrieveCandadites = this.retrieveCandadites.bind(this);
    this.loadOpenSecrets = this.loadOpenSecrets.bind(this);
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

  
    loadOpenSecrets(event){
      const candidateName = event.target.innerText
     const formateName = (name) => {
       let nameArray = name.split (" ")
        .reverse()
        .toString()
        .replace(",", ", ");
    return (nameArray)
      // console.log(event.target.innerText)
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
     this.setState({candId: realCandidateId});
     this.toggleModal();
    }

    toggleModal = () => {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }

  render() {
    return (
      <div className="modalCSS">                                     
     <Modal show={this.state.isOpen}
      onClose={this.toggleModal}>
      Financial Data On Candidate
      <OpenSecretsAPI candId={this.state.candId} />
      
      </Modal>
      
      <div
        //style={{ fontFamily: "'Work Sans', sans-serif" }}
        className="panel-group"
        id="accordion"
        role="tablist"
        aria-multiselectable="true"
      >
      
        <div className="panel panel-default">
          <div>
            {this.state.contests
              ? this.state.contests.map((contests, i) => {
                return (
                  <div className="container"
                    style={{
                      width: "70vw",
                      marginLeft: "auto",
                      marginRight: "auto",
                      textAlign: "center",
                      borderBottom: "solid black 1px",
                      overflow: "hidden"
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
                          fontSize: 22,
                          fontWeight: "bold",
                          paddingBottom: 20,
                          lineHeight: 3,
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
                            style={{
                              textAlign: "center",
                              fontSize:16,
                              paddingBottom: 30,
                              borderRadius: 10,
                              marginLeft: "auto",
                              marginRight: "auto",
                              fontFamily: "'Frank Ruhl Libre', serif"
                            }}
                            className={
                              "panel-collapse multi-collapse collapse multi-collapse" +
                              i
                            }
                            role="tabpanel"
                            aria-labelledby={"#heading" + i}
                          >

                            <div className="panel-body">
                              {" "}
                              <h3 onClick={this.loadOpenSecrets}> 
                              <a
                                style={{
                                     textDecoration: "underline",
                                     fontSize:20,
                                     fontWeight:"bold",
                                }}
                              >
                                {candidate.name}
                              </a>{""}
                              </h3>
                              <p>
                                {candidate.party}
                              </p>{" "}
                             
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
                            <p style = {{fontSize:17}}>{contests.referendumText}</p>
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
    </div>
    );
  }
}

export default Api;

