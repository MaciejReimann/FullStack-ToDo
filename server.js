const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // take requests and data from the body
const path = require('path'); // a node module - doesn't require npm i

// Import router
const items = require('./routes/api/items');

// Initialize express in app variable
const app = express();

// Apply bodyparser Middleware
app.use(bodyParser.json());

// DB Config;
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
        .then(() => console.log('MongoDB Connected!'))
        .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Serer started on ${port}`));
