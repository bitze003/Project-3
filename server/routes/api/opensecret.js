const xml2js = require('xml2js');
require('dotenv').config();
const axios = require('axios');


module.exports = (app) => {
  app.get('/candinfo', (req, res) => {
    axios.get('https://www.opensecrets.org/api/?method=candSummary', {
      params: {
        cid: req.query.candId,
        cycle: "2018",
        ind: "k02",
        apikey: process.env.SECRET_KEY
      }
    }).then(response => {
      console.log(response);
      let parser = new xml2js.Parser();

      parser.parseString(response.data, function (err, result) {
        console.dir(result);
        console.log('Done');


        res.json(result)
      });
    })
    .catch(error => {
      console.log(error)
    })
  });

  app.get('/candindustry', (req, res) => {
    axios.get('https://www.opensecrets.org/api/?method=candIndustry', {
      params: {
        cid: req.query.candId,
        cycle: "2018",
        ind: "k02",
        apikey: process.env.SECRET_KEY
      }
    }).then(response => {
      console.log(response);
      let parser = new xml2js.Parser();

      parser.parseString(response.data, function (err, result) {
        console.dir(result);
        console.log('Done');


        res.json(result)
      });
    })
    .catch(error => {
      console.log(error)
    })
  });

  app.get('/candSector', (req, res) => {
    axios.get('https://www.opensecrets.org/api/?method=candSector', {
      params: {
        cid: req.query.candId,
        cycle: "2018",
        ind: "k02",
        apikey: process.env.SECRET_KEY
      }
    }).then(response => {
      console.log(response);
      let parser = new xml2js.Parser();

      parser.parseString(response.data, function (err, result) {
        console.dir(result);
        console.log('Done');


        res.json(result)
      });
    })
    .catch(error => {
      console.log(error)
    })
  });
}
