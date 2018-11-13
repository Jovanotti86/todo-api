var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {ToDo} = require('./models/todo');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();


app.listen(3000, () => {
    console.log('Started on 3000');
});

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    var todo = new ToDo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.status(201);
        res.send(doc);
    }, (e) => {
        res.status(400);
        res.send(e);
    })
})
