import axios from "axios";

const API = {
  getInformation: function(topic, startYear, endYear) {
    const BASEURL = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=";
    const APIKEY = "AIzaSyCXwoG3eT07HmPYzM402gKblv-_KJWL3jo";
    return axios.get(BASEURL + APIKEY + "&address=" + houseNumber + "%20" + address + "%20" + addressType + "S%20City%20" + city + "%20" + state + "&electionId=2000");
  },
//   saveArticle: function(article){
//     return axios.post("/api/saved", article)
//   },
//   getArticle: function() {
//     return axios.get("/api/saved");
//   },
//   deleteArticle: function(id) {
//     return axios.delete(`/api/saved/${id}`);
//   }
};

export default API;

