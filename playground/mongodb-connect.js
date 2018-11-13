const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log('Error in connect to mongodb:', err);
    }
   const db = client.db('Todos');

   /*  db.collection('Todos').insertOne({
        task: 'iznesi djubre',
        uradjen: false
    }, (err, result) => {
        if (err) {
            return console.log ('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops));
    }); */

   /*  db.collection('Users').insertOne({
        name: 'Dragan Jovicic',
        age: 32,
        location: 'Sarajevo'
    }, (err, result) => {
        if (err) {
            return console.log('Error when inserting user', err);
        }

        console.log(JSON.stringify(result.ops));
    }) */

    var obj = new ObjectID();

    console.log(obj);

    client.close();

});