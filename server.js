const express = require('express');
const cors = require('cors');

var dashBoardServer = require('./dashboard-app/dashboard-server-app');


const fs = require('fs');

const app = express();
const PORT = 8000;

app.use(cors());
const index = 1;
const dbName = 'database1';

/**
 * Render Mock DB UI.
 */
 app.use('/', dashBoardServer);

/**
 * All service requests will be served from here
 */
app.get('/*', function(req, res) {
    let jsonRawData = fs.readFileSync(`${__dirname}/db/${dbName}.json`);
    
    const dbJson = JSON.parse(jsonRawData);
    let requiredServiceResponse = req.originalUrl.split('?')[0];
    let serviceResponse = dbJson.services[requiredServiceResponse][index];

    res.send(serviceResponse);
});

app.listen(PORT, function() {
    console.log(`server is running on: ${PORT}`);
});