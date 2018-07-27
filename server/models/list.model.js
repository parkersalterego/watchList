const mongoose = require('mongoose');

const listItems = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
});

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    items: {
        type: [listItems],
        default: []
    },
    is_deleted: {
        type: Boolean,
        default: false
    },

});

const List = module.exports = mongoose.model('List', ListSchema);