const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const data = 'hi';

app.get('/', (req, res) => res.render('index', {data: data}));

// replace the uri string with your connection string.
const uri = "mongodb+srv://admin:admin@cluster0-3ogiv.mongodb.net/test?retryWrites=true"
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});

app.listen(3000, () => console.log("Server start on 3000 port"));

