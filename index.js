const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
var arr = ['hello', 'world', 'test'];

app.get('/', (req, res) => res.render('index', {arr: arr}));
app.get('/create', (req, res) => res.render('create'));
app.post('/create', (req, res) => {
	arr.push(req.body.text);
	res.redirect('/');
});

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

app.listen(config.PORT, () => console.log(`Server start on ${config.PORT}`));

