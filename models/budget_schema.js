const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema ({
title: {
    type: String,
    trim: true,
    required: true
},
value: {
    type: Number,
    required: true,
    unique: true
},
color: {
    type: String,
    trim: true,
    required: true
}
},{collection: 'personal_budget'});

module.exports = mongoose.model('personal_budget', budgetSchema)