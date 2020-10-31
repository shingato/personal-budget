const express = require('express');
const cors  = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const budgetSchemaModel = require('./models/budget_schema');
const url = 'mongodb://localhost:27017/personal_budget'

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(cors());


app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        budgetSchemaModel.find({})
            .then((data) => {
                console.log(data)
                res.json(data);
                mongoose.connection.close();
            })
            .catch((connectionError) => {
                console.log(connectionError);
            });
        })
            .catch((connectionError) => {
                console.log(connectionError)
            });
    });

app.post('/addBudget', (req, res) => {
    console.log(req.body);
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        var newBudget = {
            id: req.body.id,
            title: req.body.title,
            value: req.body.value,
            color: req.body.color,
        };
        budgetSchemaModel.insertMany(newBudget)
            .then((data) => {
                res.json(data);
                mongoose.connection.close();
            })
            .catch((connectionError) => {
                console.log(connectionError)
            });
    })
        .catch((connectionError) => {
            console.log(connectionError)
        });
});

app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`)
});