const Animal = require('../models/animal.model.js');

// Inserts new Animal into DB
exports.create = (req, res) => {

    // Verifies that property name is not empty
    if(!req.body.name) {
        return res.status(400).send({
            message: "Animal name can not be empty"
        });
    }
        
    // Verifies that property race is not empty
    if(!req.body.race) {
        return res.status(400).send({
            message: "Animal race can not be empty"
        });
    }

    // Verifies that property shelterId is not empty
    if(!req.body.shelter) {
        return res.status(400).send({
            message: "Shelter can not be empty"
        });
    }

    // Creates new animal object
    const animal = new Animal({
        name: req.body.name || "Animal One",
        race: req.body.race || "Race One",
        shelter: req.body.shelter || 1
    });

    // Saves animal and return the object as a response
    animal.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the animal."
        });
    });
};

// Retrieves all animals stored in the DB
exports.findAll = (req, res) => {
    Animal.find()
    .populate('shelter')
    .then(animal => {
        res.send(animal);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving animals."
        });
    });
};

// Retrieves an animal by ID
exports.findOne = (req, res) => {
    Animal.findById(req.params.animalId)
    .populate('shelter')
    .then(animal => {
        // if no animal is found
        if(!animal) {
            return res.status(404).send({
                message: "Animal not found with id " + req.params.animalId
            });            
        }
        res.send(animal);
    // if an error occurs
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Animal not found with id " + req.params.animalId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving animal with id " + req.params.animalId
        });
    });
};

exports.update = (req, res) => {
    // Verifies that property name is not empty
    if(!req.body.name) {
        return res.status(400).send({
            message: "Animal name can not be empty"
        });
    }
        
    // Verifies that property race is not empty
    if(!req.body.race) {
        return res.status(400).send({
            message: "Animal race can not be empty"
        });
    }

    // Verifies that property shelterId is not empty
    if(!req.body.shelter) {
        return res.status(400).send({
            message: "Shelter can not be empty"
        });
    }

    Animal.findByIdAndUpdate(req.params.animalId, {
        name: req.body.name,
        race: req.body.race,
        shelter: req.body.shelter
    }, {new: true})
    .then(animal => {
        if(!animal) {
            return res.status(404).send({
                message: "Animal not found with id " + req.params.animalId
            });
        }
        res.send(animal);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Animal not found with id " + req.params.animalId
            });                
        }
        return res.status(500).send({
            message: "Error updating Animal with id " + req.params.animalId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Animal.findByIdAndRemove(req.params.animalId)
    .then(animal => {
        if(!animal) {
            return res.status(404).send({
                message: "Animal not found with id " + req.params.animalId
            });
        }
        res.send({message: "Animal deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Animal not found with id " + req.params.animalId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Animal with id " + req.params.animalId
        });
    });
};