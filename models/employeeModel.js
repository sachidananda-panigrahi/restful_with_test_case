var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var employeeModel = new Schema({
    employee_id: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    steps: {
        type: Number
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    }
});

module.exports = mongoose.model('employee', employeeModel);