module.exports = (app) => {
    const Animals = require('../controllers/animal.controller.js');

    // Create a new Note
    app.post('/Animals', Animals.create);

    // Retrieve all Notes
    app.get('/Animals', Animals.findAll);

    // Retrieve a single Note with noteId
    app.get('/Animals/:animalId', Animals.findOne);

    // Update a Note with noteId
    app.put('/Animals/:animalId', Animals.update);

    // Delete a Note with noteId
    app.delete('/Animals/:animalId', Animals.delete);
}