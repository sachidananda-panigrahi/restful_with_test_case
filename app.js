var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/fitsap'),
    employee = require('./models/employeeModel'),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var fitsapRouter = express.Router();

fitsapRouter.route('/employees')
    .post(function (req, res) {
        var emp = new employee(req.body);
        emp.save();
        res.status(201);
        res.send(emp);
    })
    .get(function (req, res) {

        var query = {};

        if (req.query.employee_id) {
            query.employee_id = req.query.employee_id;
        } else if (req.query.first_name) {
            query.first_name = req.query.first_name;
        } else if (req.query.last_name) {
            query.last_name = req.query.last_name;
        } else if (req.query.email) {
            query.email = req.query.email;
        } else if (req.query.steps) {
            query.steps = req.query.steps;
        }

        employee.find(query, function (err, employees) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send(err);
            } else {
                res.json(employees);
            }
        });

    });

fitsapRouter.route('/employees/:employeeId')
    .get(function (req, res) {

        employee.findById(req.params.employeeId, function (err, employee) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send(err);
            } else {
                res.json(employee);
            }
        });

    });

app.use('/api', fitsapRouter);


app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    console.log('Running the APP on PORT: ' + port);
});

