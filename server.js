require('dotenv').config();

const path = require('path');
const express = require('express');
const http = require('http');
const fallback = require('express-history-api-fallback');
const createConnection = require('./data/connection');

// const coordinates_db = createConnection('coordinates');
const submissions_db = createConnection('submissions');

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
// app.post('/api', async (request, response) => {
//     const data = request.body;
//     const timestamp = Date.now();
//     data.timestamp = timestamp;
//     await coordinates_db.insert(data);

//     response.json({
//         status: "success",
//         timestamp: timestamp,
//         latitude: data.loglat,
//         longitude: data.loglon
//     });
// });


// submissions
app.post('/submission', async (sub_request, sub_response) => { // receive the sent data from client
    const sub_data = sub_request.body; // assign the sent data to a variable
    const timestamp = Date.now(); // get the current logged time
    sub_data.timestamp = timestamp; // put the logged time to the currently made data variable
    try {
        await submissions_db.insert(sub_data);  // insert all the data into an array called submissions_db
        const data = await submissions_db.find({}, { sort: { timestamp: 1 } });
        sub_response.json(data); // send back response       
    } catch (err) {
        sub_response.end();
    }
});

app.use(express.static(root));
// fallback
app.use(fallback('index.html', { root }));
