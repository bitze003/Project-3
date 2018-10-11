import React, { Component } from "react";




class Map extends Component {

    componentDidMount() {
        this.renderMap()
    }

    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCXwoG3eT07HmPYzM402gKblv-_KJWL3jo&callback=initMap")
        window.initMap = this.initMap;
        window.addMarker = this.addMarker;
    }

    initMap = () => {
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 44.9537, lng: -93.0900 },
            zoom: 10
        });
    }

    addMarker = () => {
        var address = document.getElementById('address').value;
        window.geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == window.google.maps.GeocoderStatus.OK) {
                window.map.setCenter(results[0].geometry.location);
                var marker = new window.google.maps.Marker({
                    map: window.map,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    render() {
        return (
            <main>
                <div id="map" style={{height : "60vh", width : "30vw", float:"right", marginTop:"2%"}}>
  </div>
      </main >   
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
