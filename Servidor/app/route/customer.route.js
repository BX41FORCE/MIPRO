module.exports = function(app) {
    const customers = require('../controller/customer.controller.js');
 
    // Create a new Customer
    app.post('/api/customers_add', customers.create);
 
    // Retrieve all Customer
    app.get('/api/customers_all', customers.findAll);
 
    // Retrieve a single Customer by Id
    app.get('/api/customers/:id', customers.findById);
 
    // Update a Customer with Id
    app.put('/api/customers_up', customers.update);
 
    // Delete a Customer with Id
    app.delete('/api/customers_delete/:id', customers.delete);
}