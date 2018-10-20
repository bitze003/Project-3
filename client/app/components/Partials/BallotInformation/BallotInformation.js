import React, { Component } from "react";
import axios from "axios";
import cid from "../../../utils/OpenSecrets/cid"
import {
  getFromStorage,
  setInStorage,
} from '../../../utils/storage';
import OpenSecrets from "../../Partials/OpenSecrets/OpenSecrets";
import Modal from "../../Modal/Modal";

class BallotInformation extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      contests: [],
      candId: "",
      isOpen:false
    
    };
    this.retrieveCandadites = this.retrieveCandadites.bind(this);
    this.loadOpenSecrets = this.loadOpenSecrets.bind(this);
  };

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
  
  loadOpenSecrets = (param) => (event) => {
    event.preventDefault()
      console.log(param)

    const formatName = (name) => {
      let nameArray = name.split (" ")
        .reverse()
        .toString()
        .replace(",", ", ");
      return (nameArray)
     }

      const candidateName = formatName(param);
        console.log(candidateName)

      const candidateIds = cid.filter((candidate)=> {
       return (candidate.CRPName == candidateName);
      });
    
      
      const realCandidateId = candidateIds[0].CID;
      console.log(realCandidateId)
      this.setState({candId: realCandidateId}, function () {
        console.log(this.state.candId);
      })
        this.toggleModal();
      };
      

    toggleModal = () => {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }

  render() {
    return (
      <div className="modalCSS">                                     
      <Modal show={this.state.isOpen} onClose={this.toggleModal}>
        <OpenSecrets candId={this.state.candId} />
      </Modal>
      
      <div
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
                    <div
                      className="panel-title"
                    >
                      <a className="panel-title"
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
                    </div>

                    {contests.candidates ? (
                      contests.candidates.map(candidate => {
                        return (
                          <div
                            id={"collapse" + i}
                            style={{
                              textAlign: "center",
                              fontSize:16,
                              paddingBottom: 10,
                              borderRadius: 10,
                              marginLeft: "auto",
                              marginRight: "auto",
                              fontFamily: "'Frank Ruhl Libre', serif"
                            }}
                            className={"panel-collapse multi-collapse collapse multi-collapse" + i}
                            role="tabpanel"
                            aria-labelledby={"#heading" + i}
                          >
                            <div className="panel-body">
                              {" "}
                              <a
                                href={'https://www.google.com/search?q='  + candidate.name}
                                target="_blank"
                                style={{
                                     textDecoration: "underline",
                                     fontSize:20,
                                     fontWeight:"bold",
                                }}
                              >
                                <h5>{candidate.name}</h5>
                              </a>{""}
                              <h6>{candidate.party}</h6>
                              {/* <h5 onClick={this.loadOpenSecrets(candidate.name, event)}>Financials</h5> */}
                              {" "}
                  
                            </div>

                          </div>
                        );
                      })
                    ) : (
                        <div
                          id={"collapse" + i}
                          className={"panel-collapse multi-collapse collapse multi-collapse" + i}
                          role="tabpanel"
                          aria-labelledby={"#heading" + i}
                        >
                          <div className="panel-body">
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

export default BallotInformation;

