const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnonceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String
    },

});


const Annonces = mongoose.model('Annonces', AnnonceSchema);
module.exports = Annonces;