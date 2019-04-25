const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const objectId = require("mongodb").ObjectID;

const mongoClient = new MongoClient(config.MONGO_URL, { useNewUrlParser: true });

const app = express();


	mongoClient.connect((err, client)=>{
		if(err) return console.log(err);
		dbClient = client;
		app.locals.collection = client.db('todolist').collection('data');
		app.listen(config.PORT, () => console.log(`Server start on ${config.PORT}`));
	});


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => { // рисуем индекс
	res.render('index');
	});

app.get('/tasks',(req, res) =>{
	const collection = req.app.locals.collection;
	collection.find({}).toArray((err, results)=>{
		let arr = [];
		let i = 0;
		while(results[i])
		{
			arr.push(results[i]._id);
			arr.push(results[i].task);
			i++;
		}
		res.send(arr);
	});
});
app.post('/delete', (req, res) =>{
	console.log(req.body.id);
	const collection = req.app.locals.collection;
	const id = new objectId(req.body.id);
	collection.findOneAndDelete({_id: id}, (err, user)=>{
		if(err) return console.log(err);
		res.send('Успешно');
	})
});

app.post('/', (req,res)=>{
	let task = {task: req.body.task};

	const collection = req.app.locals.collection;
	collection.insertOne(task,(err,result)=>{
		if(err) return console.log(err);
		res.redirect('/');
	});
});




