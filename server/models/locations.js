'use strict';

var mongoose = require('mongoose');

var openingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    opening: {
        type: String,
        required: false
    },
    closing: {
        type: String,
        required: false
    },
    closed: {
        type: Boolean,
        required: true
    }
});

var reviewSchema = new mongoose.Schema({
    author: {
        displayName: String
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {
        type: String,
        required: false
    },
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

var locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5,
        required: false
    },
    facilities: [String],
    coords: {
        type: [Number],
        index: '2dsphere'
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);