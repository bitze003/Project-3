import axios from "axios";
require('dotenv').config({path: __dirname + '/.env'});
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const API = {
  getInformation: function(houseNumber, streetName, addressType, city, state) {
    const BASEURL = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=";
    const APIKEY = process.env.GOOGLE_CIVIC_KEY;
    console.log("process.env.GOOGLE_CIVIC_KEY = " + APIKEY)
    return axios.get(BASEURL + APIKEY + "&address=" + houseNumber + "%20" + streetName + "%20" + addressType + "S%20City%20" + city + "%20" + state + "&electionId=2000");
  }

  // saveArticle: function(article){
  //   return axios.post("/api/saved", article)
  // },
  // getArticle: function() {
  //   return axios.get("/api/saved");
  // },
  // deleteArticle: function(id) {
  //   return axios.delete(`/api/saved/${id}`);
  // }
};

export default API;

