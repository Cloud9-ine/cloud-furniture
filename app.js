const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require('./routes/products-routes');

const app = express();

// Parse any request body and extract JSON within
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/api/products', productsRoutes);

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cloud9-cluster.evgsukn.mongodb.net/?retryWrites=true&w=majority&appName=cloud9-cluster`
    )
    .then(() => {
        app.listen(5000);
    }).
    catch((err) => {
        console.log(err);
    });
