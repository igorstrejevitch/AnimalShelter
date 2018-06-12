const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
    name: String,
    race: String,
    shelter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shelter'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Animal', AnimalSchema);