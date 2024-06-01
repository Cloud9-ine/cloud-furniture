const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require('./routes/products-routes');

const app = express();

// Parse any request body and extract JSON within
app.use(bodyParser.json());

app.use('/api/products', productsRoutes);

mongoose
    .connect('mongodb+srv://<username>:<password>@cloud9-cluster.evgsukn.mongodb.net/?retryWrites=true&w=majority&appName=cloud9-cluster')
    .then(() => {
        app.listen(5000);
    }).
    catch((err) => {
        console.log(err);
    });
