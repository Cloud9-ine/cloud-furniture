const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    posted_date: { type: String, required: true },
    available_date: { type: String, required: true },
    tags: [{ type: String }],
    images: [{ type: String }]
});


module.exports = mongoose.model('Product', productSchema);
