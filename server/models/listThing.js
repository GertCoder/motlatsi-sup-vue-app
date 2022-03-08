const { Schema, model } = require('mongoose');

const listThingSchema = new Schema({
    title: {
        type: String,
    },
    name: {
        type: String
    },
    userId: {
        type: Number
    },
    description: {
        type: String
    },
    tags: {
        type: Array
    },
    flagged: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now(),
    },
})
const ListThing = model('thingList', listThingSchema);

module.exports = ListThing;