const mongoose = require('mongoose');

const ShelterSchema = mongoose.Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Shelter', ShelterSchema);
