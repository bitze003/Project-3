import axios from "axios";
const xml2js = require('xml2js');
require('dotenv').config();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
} 
const OpenSecretsAPI = {
  getFinancials: function(CID) {
    axios.get('https://www.opensecrets.org/api/?method=candSector', {
      params: {
        cid: CID,
        cycle: "2018",
        ind: "k02",
        apikey: '86277e8d8a519f6fb2bd6b0ec9683aca'
      }
    }).then(response => {
      console.log(response);
      let parser = new xml2js.Parser();

      parser.parseString(response.data, function (err, result) {
        console.dir(result);
        console.log('Done');


        return res.json(result)
      });
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export default OpenSecretsAPI;