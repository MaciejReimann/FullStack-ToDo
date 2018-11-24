const express = require('express');
const mongoose = require('mongoose');
// Take requests and data from the body;
const bodyParser = require('body-parser');

// Initialize express into app;
const app = express();

// Bodyparser Middleware;
app.use(bodyParser.json());

// DB Config;
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db)
        .then(() => console.log('mongoD connected'))
        .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Serer started on ${port}`));
