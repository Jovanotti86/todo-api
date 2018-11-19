var {mongoose, } = require('./db/mongoose');
var {User} = require('./models/user');
var {ToDo} = require('./models/todo');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Started up at port ${port}` );
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

app.get('/todos', (req, res) => {
    ToDo.find().then((todos) => {
        res.status(200);
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    ToDo.findById(id).then((todo) => {
       if(todo) {
        res.status(200);
        res.send({todo});
       } else {
           res.status(404);
           res.send();
       }
    }, (e) => {
        res.status(400);
        res.send(e);
    })
});


module.exports = {app};