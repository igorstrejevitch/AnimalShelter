module.exports = (app) => {
    const Workers = require('../controllers/worker.controller.js');

    // Create a new Note
    app.post('/Workers', Workers.create);

    // Retrieve all Notes
    app.get('/Workers', Workers.findAll);

    // Retrieve a single Note with noteId
    app.get('/Workers/:shelterId', Workers.findOne);

    // Update a Note with noteId
    app.put('/Workers/:shelterId', Workers.update);

    // Delete a Note with noteId
    app.delete('/Workers/:shelterId', Workers.delete);
}