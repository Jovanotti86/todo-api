const env = process.env.NODE_ENV || 'development';

if(env === 'development') {
    process.env.PORT ===3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoApp';

} else if( env === 'test') {
    process.env.PORT ===3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoAppTest';
}

const {mongoose, } = require('./db/mongoose');
const {User} = require('./models/user');
const {ToDo} = require('./models/todo');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const _  = require('lodash');

var app = express();
const port = process.env.PORT;


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

app.delete(`/todos/:id`, (req, res) => {
    ToDo.findByIdAndRemove(req.params.id).then((todo) => {
        res.status(200);
        res.send({todo});
    }, (e) => {
        res.status(400);
        res.send(e);
    })
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectId.isValid(id)) {
        return res.status(400).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    ToDo.findByIdAndUpdate(id,{$set: body}, {new: true}).then((todo) => {
        res.status(200).send({todo});
    }).catch((e) => res.status(400).send(e));
})


module.exports = {app};