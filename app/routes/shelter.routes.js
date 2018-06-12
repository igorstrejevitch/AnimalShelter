module.exports = (app) => {
    const Shelters = require('../controllers/shelter.controller.js');

    // Create a new Note
    app.post('/Shelters', Shelters.create);

    // Retrieve all Notes
    app.get('/Shelters', Shelters.findAll);

    // Retrieve a single Note with noteId
    app.get('/Shelters/:shelterId', Shelters.findOne);

    // Retrieve animals that belong to one shelter
    app.get('/Shelters/Animals/:shelterId', Shelters.findAnimals);

    // Retrieve workers that belong to one shelter
    app.get('/Shelters/Workers/:shelterId', Shelters.findAnimals);

    // Update a Note with noteId
    app.put('/Shelters/:shelterId', Shelters.update);

    // Delete a Note with noteId
    app.delete('/Shelters/:shelterId', Shelters.delete);
}