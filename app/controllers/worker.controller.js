const Worker = require('../models/worker.model.js');

exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Worker name can not be empty"
        });
    }

    if(!req.body.shelter) {
        return res.status(400).send({
            message: "Shelter can not be empty"
        });
    }

        // Create a Note
    const worker = new Worker({
        name: req.body.name || "Worker One",
        shelter: req.body.shelter || 1
    });

    worker.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the worker."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Worker.find()
    .populate('shelter')
    .then(worker => {
        res.send(worker);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving workers."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Worker.findById(req.params.workerId)
    .populate('shelter')
    .then(worker => {
        if(!worker) {
            return res.status(404).send({
                message: "Worker not found with id " + req.params.workerId
            });            
        }
        res.send(worker);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Worker not found with id " + req.params.workerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving worker with id " + req.params.workerId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    
    if(!req.body.name) {
        return res.status(400).send({
            message: "Worker name can not be empty"
        });
    }

    if(!req.body.shelter) {
        return res.status(400).send({
            message: "Shelter can not be empty"
        });
    }
    Worker.findByIdAndUpdate(req.params.workerId, {
        name: req.body.name,
        shelter: req.body.shelter
    }, {new: true})
    .then(worker => {
        if(!worker) {
            return res.status(404).send({
                message: "Worker not found with id " + req.params.workerId
            });
        }
        res.send(worker);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Worker not found with id " + req.params.workerId
            });                
        }
        return res.status(500).send({
            message: "Error updating Worker with id " + req.params.workerId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Worker.findByIdAndRemove(req.params.workerId)
    .then(worker => {
        if(!worker) {
            return res.status(404).send({
                message: "Worker not found with id " + req.params.workerId
            });
        }
        res.send({message: "Worker deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Worker not found with id " + req.params.workerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Worker with id " + req.params.workerId
        });
    });
};