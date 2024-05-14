const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema(
    {
        Address: {
            type: String,
            required: true
        },

        Price: {
            type: Number,
            required: true
        },

        location: {
            type: String,
            required: true

        },
        Image: {
            type : String,
            required : true

        },
        updatedAt: Date

    }
);
module.exports = mongoose.model('Favourit', favouriteSchema);