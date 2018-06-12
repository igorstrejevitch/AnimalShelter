const mongoose = require('mongoose');

const WorkerSchema = mongoose.Schema({
    name: String,
    shelter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shelter'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Worker', WorkerSchema);
