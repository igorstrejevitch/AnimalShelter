const Shelter = require('../models/shelter.model.js');
const Animal = require('../models/animal.model.js');
const Worker = require('../models/worker.model.js');

// Inserts new shelter into DB
exports.create = (req, res) => {

    // Verifies that property name is not empty
    if(!req.body.name) {
        return res.status(400).send({
            message: "Shelter name can not be empty"
        });
    }

    // Creates new Shelter object
    const shelter = new Shelter({
        name: req.body.title || "Shelter One", 
    });

    // Saves shelter and returns the object as response
    shelter.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the shelter."
        });
    });
};

// Retrieves all shelters stored in the DB
exports.findAll = (req, res) => {
    Shelter.find()
    .then(shelter => {
        res.send(shelter);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving shelters."
        });
    });
};

// Retrieves a shelter by ID
exports.findOne = (req, res) => {
    Shelter.findById(req.params.shelterId)
    .populate('animals')
    .then(shelter => {
        if(!shelter) {
            return res.status(404).send({
                message: "Shelter not found with id " + req.params.shelterId
            });            
        }
        res.send(shelter);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Shelter not found with id " + req.params.shelterId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving shelter with id " + req.params.shelterId
        });
    });
};

// Retrieves all animals belonging to the shelterId
exports.findAnimals = (req, res) => {
    Animal.find({shelter: req.params.shelterId})
    .populate('shelter')
    .then(animals => {
        if(!animals) {
            return res.status(404).send({
                message: "Animals not found with shelter id " + req.params.shelterId
            });            
        }
        res.send(animals);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Animals not found with shelter id " + req.params.shelterId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving animals with shelter id " + req.params.shelterId
        });
    });
};

// Retrieves all workers belonging to the shelterId
exports.findWorkers = (req, res) => {
    Worker.find({shelter: req.params.shelterId})
    .populate('shelter')
    .then(workers => {
        if(!workers) {
            return res.status(404).send({
                message: "Workers not found with shelter id " + req.params.shelterId
            });            
        }
        res.send(workers);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Animals not found with shelter id " + req.params.shelterId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving animals with shelter id " + req.params.shelterId
        });
    });
};

// Update a Shelter
exports.update = (req, res) => {

    // Verifies that property name is not empty
    if(!req.body.name) {
        return res.status(400).send({
            message: "Shelter name can not be empty"
        });
    }

    Shelter.findByIdAndUpdate(req.params.shelterId, {
        name: req.body.name,
    }, {new: true})
    .then(shelter => {
        if(!shelter) {
            return res.status(404).send({
                message: "Shelter not found with id " + req.params.shelterId
            });
        }
        res.send(shelter);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Shelter not found with id " + req.params.shelterId
            });                
        }
        return res.status(500).send({
            message: "Error updating Shelter with id " + req.params.shelterId
        });
    });
};

// Delete a Shelter
exports.delete = (req, res) => {
    Shelter.findByIdAndRemove(req.params.shelterId)
    .then(shelter => {
        if(!shelter) {
            return res.status(404).send({
                message: "Shelter not found with id " + req.params.shelterId
            });
        }
        res.send({message: "Shelter deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Shelter not found with id " + req.params.shelterId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Shelter with id " + req.params.shelterId
        });
    });
};