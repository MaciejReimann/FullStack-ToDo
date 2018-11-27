const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // take requests and data from the body
const path = require('path'); // a node module - doesn't require npm i
const PORT = process.env.PORT || 5000;
// Import router
const items = require('./routes/api/items');

// Initialize express in app variable
const app = express();

// Apply bodyparser Middleware
// Parse incoming request bodies in a middleware before your handlers, 
// available under the req.body property.
// https://www.npmjs.com/package/body-parser
app.use(bodyParser.json());

// DB Config;
const db = require('./config/keys').mongoURI;

// Connect to Mongo
if (db) {
    mongoose
    .connect(db)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err))
} else {
    console.error("MONGOOSE ERROR: Probably some problem with Mongo keys")
}

// Use Routes
app.use('/api/items', items);

// Set static folder
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.listen(PORT, () => console.log(`Server started on ${PORT}`));
