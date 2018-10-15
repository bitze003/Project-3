import React, { Component } from "react";
import axios from "axios";
import Polling from "../PollingLocation/PollingLocation";
import stateData from "../PollingLocation/States";

class Map extends Component {

    componentDidMount() {
        // this.retrieveCandadites();
        this.renderMap();
    }

    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCXwoG3eT07HmPYzM402gKblv-_KJWL3jo&callback=initMap")
        window.initMap = this.initMap;
        window.addMarker = this.addMarker;
        console.log()
    }

    initMap = () => {
        var geocoder = new window.google.maps.Geocoder();
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 44.9537, lng: -93.0900 },
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });

        var address = ("Jefferson Community School");
        /* alert(address); */
        geocoder.geocode({ address: address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: ''
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
            var infoWindow = new google.maps.InfoWindow({
               
                content:  '<p><strong>This is your Polling Place<br><a href="https://www.google.com/maps/dir/'+address+'"> Click for Directions!</a></strong></p>'
            });
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
        });

    }

    render() {
        return (

            <div id="map" className="map col-sm-4" style={{ height: "60vh", width: "30vw", marginTop: "0%" }}>
            </div>

        )
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

export default Map;