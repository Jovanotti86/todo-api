const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log('Error in connect to mongodb:', err);
    }
   const db = client.db('Todos');

    db.collection('Todos').find().toArray().then((docs) => {
        console.log('inside results');

        console.log(JSON.stringify(docs, undefined, 2));
    })
    client.close();

    
});