const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');

const mongoClient = new MongoClient(config.MONGO_URL, { useNewUrlParser: true });




const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => { // рисуем индекс
	res.render('index');
	});

app.get('/tasks',(req, res) =>{
	mongoClient.connect((err, client)=>{
	const db = client.db('todolist');
	const collection = db.collection('data');
	
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
	})
});
})



app.listen(config.PORT, () => console.log(`Server start on ${config.PORT}`));