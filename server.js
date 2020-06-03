const express = require('express');
const Datastore = require('nedb');
const app = express();

const database = new Datastore('database/database.db');
const submission_database = new Datastore('database/submission_count.db');
database.loadDatabase(); // used to create a database file
submission_database.loadDatabase();
// create a host port
const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log(`listening at port ${port}`);
});
app.use(express.static("public")); // use public folder as the entry to the site
app.use(express.json({limit: '1mb'})); // convert any request into a json file

// data logging
app.post("/api", (request, response) => { // receive the sent data from client
    // console.log(request.body);
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
    console.log("I got a submission");
    console.log(sub_request.body);
    const sub_data = sub_request.body; // assign the sent data to a variable
    const timestamp = Date.now(); // get the current logged time
    sub_data.timestamp = timestamp; // put the logged time to the currently made data variable
    submission_database.insert(sub_data);  // insert all the data into an array called submission_database
    console.log(submission_database);
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