import React, { Component } from "react";
import axios from "axios";


class Api extends Component {
  constructor(props) {
    super(props);
    this.state = { contests: [] };
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
      "&electionId=2000";

    const self = this;
    axios
      .get(queryURL)
      .then(function(response) {
       
        //console.log(response.data);
        self.setState({ contests: response.data.contests });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.retrieveCandadites();
  }

  render() {
    return (
      <div
      style={{fontFamily:"'Work Sans', sans-serif"}}
        className="panel-group"
        id="accordion"
        role="tablist"
        aria-multiselectable="true"
      >
        <div className="panel panel-default" >
          <div>
            {this.state.contests
              ? this.state.contests.map((contests, i) => {
                //console.log(contests)
                  return (
                    <div
                    style={{marginTop: 10}}
                      className="panel-heading "
                      role="tab"
                      id={"heading" +  i}
                    >
                      <h2 
                      style={{textAlign:"center", fontSize: 32}}
                      className="panel-title" 
                      >
                        <a
                          id={"headerLink" + i}
                          role="button"
                          data-toggle="collapse"
                          data-target= {".multi-collapse" + i}
                          data-parent="#accordion"
                          href={"#headLink" + i}
                          aria-expanded="false"
                          aria-controls={"collapse" + i}
                          className="office"
                        >
                          {contests.office}
                        </a>
                      </h2>
                      {contests.candidates ? contests.candidates.map(candidate => {
                      
                        return (
                          <div
                            id={"collapse" + i}
                            style={{width: 500, backgroundColor: "#D3D3D3", marginTop: 20, borderRadius: 10, marginLeft: "auto", marginRight: "auto", fontFamily:"'Work Sans', sans-serif"}}
                            className={"panel-collapse multi-collapse collapse multi-collapse" + i} 
                            role="tabpanel"
                            aria-labelledby={"#heading" + i}
                          >
                            <div className="panel-body"> <h3 style={{textDecoration: "underline"}}>{candidate.name}</h3> <h4>{candidate.party}</h4> <h4><a href={candidate.candidateUrl} target="blank">{candidate.candidateUrl}</a></h4></div>
                          </div>
                        );
                      })
                      : ""}
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
