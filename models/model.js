const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name : {
        lname : {
            type: String,
            required : true
        },

        fname : {
            type : String,
            required: true
        },

        phone_number:{
            type: Number,
            required: true
        }
    }
});

module.exports = mongoose.model('Phonebook',dataSchema);