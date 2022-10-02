const mongoose = require("mongoose");

mongoose.model("career",{
    _id:{
        type: Number,
        require: true
    },
    academic_level: {
        type: String,
    },
    name: {
        type: String,
    },
    SNIES_code: {
        type: Number,
    },
    credits: {
        type: Number
    },
    department: {
        type: String,
    },
    faculty: {
        type: String,
    },
    campus: {
        type: String,
    },
    pensum: [{
        type: Number
    }]
})