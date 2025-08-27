require('dotenv').config();

const path = require('path');
const express = require('express');
const Datastore = require('nedb');
const http = require('http');
const fallback = require('express-history-api-fallback');

const database = new Datastore('database/database.db');
const submission_database = new Datastore('database/submission_count.db');

database.loadDatabase(); // used to create a database file
submission_database.loadDatabase();

const root = path.join(__dirname, './public');
const port = process.env.PORT || 5500;

const app = express();
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});
app.use(express.json({limit: '1mb'})); // convert any request into a json file

app.get('/openaq/locations', async (req, res) => {
    const { limit } = req.query;
    const url = `https://api.openaq.org/v3/locations?limit=${limit}`;
    const response = await fetch(url, {
        headers: {
            'X-API-Key': process.env.OPENAQ_API_KEY
        }
    });
    const json = await response.json();
    res.json(json);
});
app.get('/openaq/parameters', async (_, res) => {
    const url = 'https://api.openaq.org/v3/parameters';
    const response = await fetch(url, {
        headers: {
            'X-API-Key': process.env.OPENAQ_API_KEY
        }
    });
    const json = await response.json();
    res.json(json);
});
app.get('/openaq/parameters/latest', async (req, res) => {
    const { parameters_id } = req.query;
    const url = `https://api.openaq.org/v3/parameters/${parameters_id}/latest`;
    const response = await fetch(url, {
        headers: {
            'X-API-Key': process.env.OPENAQ_API_KEY
        }
    });
    const json = await response.json();
    res.json(json);
});

// data logging
app.post("/api", (request, response) => { // receive the sent data from client
    const data = request.body; // assign the sent data to a variable
    const timestamp = Date.now(); // get the current logged time
    data.timestamp = timestamp; // put the logged time to the currently made data variable
    database.insert(data);  // insert all the data into an array called database
    
    database.find({}, (err) => {
        if (err) {
            response.end();
            return;
        } else {
            response.json({ // respond it back to the client
                status: "success",
                timestamp: timestamp,
                latitude: data.loglat,
                longitude: data.loglon
            });
        }
    })
});


// submissions
app.post("/submission", (sub_request, sub_response) => { // receive the sent data from client
    const sub_data = sub_request.body; // assign the sent data to a variable
    const timestamp = Date.now(); // get the current logged time
    sub_data.timestamp = timestamp; // put the logged time to the currently made data variable
    submission_database.insert(sub_data);  // insert all the data into an array called submission_database
    submission_database.find({}).sort({ timestamp: 1 }).exec((err, data) => { // find all data from database, sort them by timestamp and execute 2 functions
        if (err) { // if error
            sub_response.end(); // end and return
            return;
        } else { // if not error          
          sub_response.json(data); // send back response       
            // sub_response.json({ // respond it back to the client
            //     status: "success",
            //     timestamp: timestamp,
            //     pollutant: sub_data.pollutants
            // });
           
        }
        
    })
});

app.use(express.static(root));
// fallback
app.use(fallback('index.html', { root }));
