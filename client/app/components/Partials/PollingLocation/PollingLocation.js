import React, { Component } from "react";
import axios from "axios";
import stateData from "./States.json";
import {
  getFromStorage,
  setInStorage,
} from '../../../utils/storage';
class Polling extends Component {
  constructor(props) {
    super(props);
    this.state = { pollingLocations: []};
    this.retrievePollingLocations = this.retrievePollingLocations.bind(this);
  }

 returnAddress(){
  
  const obj = getFromStorage('Electioneer');

    var addressDetails = {
     houseNumber : obj.houseNumber,
     address :obj.streetName,
     addressType : obj.addressType,
     city : obj.city,
     yourState : obj.state

    }
    return addressDetails;
 }


  retrievePollingLocations() {

    var queryURL =
      "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyCXwoG3eT07HmPYzM402gKblv-_KJWL3jo&address=" +
      this.returnAddress().houseNumber +
      "%20" +
      this.returnAddress().address +
      "%20" +
      this.returnAddress().addressType +
      "S%20City%20" +
      this.returnAddress().city +
      "%20" +
      this.returnAddress().yourState +
      "&electionId=6000";

    //const self = this;
    axios.get(queryURL)
    .then((response) => {
      console.log(response);
      
      this.setState({pollingLocations: response.data.pollingLocations });
      
      this.renderMap();
    })
   .catch((error)=>{
      console.log(error);
   });
  }

 
  renderMap = () => {


    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCXwoG3eT07HmPYzM402gKblv-_KJWL3jo&callback=initMap")
    window.initMap = this.initMap;
    window.addMarker = this.addMarker;
    
}


initMap = () => {
    
    var geocoder = new window.google.maps.Geocoder();

    var map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 44.9537, lng: -93.0900 },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.HYBRID
        
    });
    var userAddress=(this.returnAddress().houseNumber)+" "+(this.returnAddress().address)+" "+(this.returnAddress().addressType)+","+(this.returnAddress().city)+","+(this.returnAddress().yourState)
    
    var address = (this.state.pollingLocations[0].address.locationName + " " + this.state.pollingLocations[0].address.line1 + " " + this.state.pollingLocations[0].address.city + " " + this.state.pollingLocations[0].address.state + " " + this.state.pollingLocations[0].address.zip);
    console.log("state below here")
    console.log(this.state.pollingLocations[0].address)
    console.log("this is the address") 
    console.log(address);
    geocoder.geocode({ address: address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                icon: ''
            });
        } else {
            //alert('Geocode was not successful for the following reason: ' + status);
        }
        var infoWindow = new google.maps.InfoWindow({
           
            content:  '<p><strong><br>This is your Polling Place<br><a href="https://www.google.com/maps/dir/'+userAddress+'/'+address+'"> Click here for Directions!</a></strong></p>'
        });
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    });
  }
  

  

  componentDidMount() {
    this.retrievePollingLocations();
    //setTimeout(this.renderMap(), 2000);

  }
  

  render() {
   

    return (
<div className="row">

<div id="map" className="map col-sm-5" style={{ height: "60vh", width: "30vw", marginTop: "0%" }}>
            </div>



      <div className="col-sm-7"style={{ textAlign:"center"}}>
        <h3> Your Local Polling Location<br></br><br></br></h3>

        {this.state.pollingLocations
          ? this.state.pollingLocations.map(polling => {
              //console.log(this.state);

              return (
                <div className="col-sm-12" style={{ textAlign:"center"}}
                  style={{
                   
                    borderRadius: 0,
                    width: "100%",
                    textAlign: "center"
                  }}
                >
                  <p id="locationName">{polling.address.locationName}</p>
                  <p id="line1">{polling.address.line1}</p>
                  <p id="cityStateZip">
                    {polling.address.city}, {polling.address.state}{" "}
                    {polling.address.zip}
                  </p>
                </div>
              );
            })
          : stateData.map(abbreviation => {
              let stateWebsite = "";
              if (abbreviation.abbreviation === this.returnAddress().yourState) {
                stateWebsite = abbreviation.website;
                return (
                  <div
                    style={{
                      backgroundColor: "#D3D3D3",
                      borderRadius: 10,
                      width: 500,
                      textAlign: "center"
                    }}
                  >
                    <p>
                      Please visit state website to find closest polling
                      locations at:{" "}
                    </p>
                    <p>{stateWebsite}</p>
                  </div>
                );
              } else {
                return;
              }
              return <div />;
            })}
      </div>

      </div>
    );
  }
}

function loadScript(url) {
  var script = window.document.createElement("script");
  var index = window.document.getElementsByTagName("script")[0]
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default Polling;