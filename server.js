var express = require('express');
var app = express();

var mongoose = require('mongoose'),
	db = mongoose.createConnection('mongodb://localhost:27017/test');

//db.open();

var PostSchema = mongoose.Schema({
	title : 'String',
	date : 'Date',
	author : 'String'
});

var PostModel = db.model('post', PostSchema);

app.use('/public', express.static('public'));
app.use(express.bodyParser());

app.get('/', function(req, res){
	res.sendfile('index.html');
});

app.get('/posts', function(req, res) {
	console.log("received a GET on /posts");
	PostModel.find({}, null, null, function(err, docs){
		if(err){
			console.log("an error occurred running the query");
		}
		else
		{
			res.json(docs);
		}
	});
		//[
		//	{title: 'Hello World!', date: '1/1/2012', author: 'Pat'},
		//	{title: 'Backbone is awesome!', date: '1/2/2012', author: 'Pat'},
		//	{title: 'Express is awesomer!', date: '1/1/2012', author: 'Pat'}
		//])
});

app.post('/posts', function(req, res){
	console.log("post received on /posts");
	var newPost = new PostModel({
		title : req.body.title,
		date : req.body.date,
		author : req.body.author
	});

	newPost.save(function(err, model) { 
		if(err) { console.log("yikes"); }
	});
});

app.listen(3000);
console.log("listening on port 3000");
