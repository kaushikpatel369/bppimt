	var express = require('express');
	var app = express();
	//var mongojs = require('mongojs');
	//var db = mongojs('contactlist',['contactlist,users']);
	var ObjectID = require('mongodb').ObjectID;
	var MongoClient = require('mongodb').MongoClient;
	var bodyParser = require('body-parser');
	app.use(express.static(__dirname + "/public"))
	app.use(bodyParser.json());
	app.use(function (req, res, next) {
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');
		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);
		// Pass to next layer of middleware
		next();
	});

	var url = 'mongodb://localhost:27017/bppimt';
	//mongodb://raj9701:raj970123@ds155727.mlab.com:55727/contactlists
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	console.log("Connected to Database");
	
	app.post('/bppimt_s',function(req,res){
			console.log("i get GET request");
			console.log(req.body);
			db.collection('student').find({stream:req.body.stream,sem:req.body.sem}).toArray(function(err,docs){
				console.log(docs);
				//assert.equal(1, docs);
				res.json(docs);
			});
	});
	//take attandance and store in db
	app.post('/bppimt/:at',function(req,res){
			console.log("i get GET attandance request");
			console.log(req.body);
			db.collection('mcaatt').insertOne(req.body,function(err,docs){
				//console.log(docs);
				//assert.equal(1, docs);
				res.json(docs);
			});
	});
	
	//add the class details in db
	app.post('/classdata/',function(req,res){
			console.log("i get GET add class request");
			console.log(req.body);
			db.collection('mcacls').insertOne(req.body,function(err,docs){
				//console.log(docs);
				//assert.equal(1, docs);
				res.json(docs);
			});
	});
	
	app.post('/bppimttotal',function(req,res){
		console.log("i get total attandence request");
		console.log(req.body.Roll);
		
		db.collection('mcaatt').find({roll:req.body.Roll}).toArray(function(err,docs){
			console.log(docs);
			console.log('inside total');
			res.json(docs);
		});
	});
	
	
	
	
	app.post('/bppimt',function(req,res){
		console.log("I get GET request");
		console.log(req.body);

		db.collection('teacher').find({username:req.body.username,password:req.body.password}).toArray(function(err,docs){
			console.log(docs);
			console.log(docs);
			console.log('working');
			res.json(docs);
		});
	});
	
	//total class count
	
		app.post('/clscount',function(req,res){
		console.log("I get total class request");
		console.log(req.body);

		db.collection('mcacls').find({stream:req.body.stream,subject:req.body.subject}).toArray(function(err,docs){
			console.log(docs);
			console.log(docs);
			console.log(' total class working');
			res.json(docs);
		});
	});

	app.get('/bppimt',function(req,res){
			console.log(req.body)
			db.collection('users').insertOne(req.body,function(err,docs){
				console.log(docs);
				res.json(docs);
			})
	});
	
	app.post('/removeatt/',function(req,res){
			//var id = req.params.id;
			console.log('delete one');
			console.log('delete one');
			console.log('delete one');
			console.log('delete one');
			console.log('delete one');
			//var roll=req.params.ida;
			console.log(req.body);
			
			db.collection('mcaatt').deleteOne(req.body,function(err,docs){
				res.json(docs);
				console.log(docs);
				
				console.log('deleteeeeeeedd');
			});
	});

	app.get('/bppimt/:id',function(req,res){
			var id = req.params.id;
			console.log(id);
			db.collection('users').findOne({_id: ObjectID(id)},function(err,docs){
				console.log(docs);
				res.send(docs);
			});
	});

	app.put('/bppimt/:id',function(req,res){
			var id = req.params.id;
			console.log(req.body.name);
			console.log(id);
			db.collection('users').updateOne(
				{_id:ObjectID(id)},
				{$set: {name: req.body.name,email:req.body.email,number:req.body.number}},
				{upsert: true},
				function(err,docs){
					console.log(docs);
					res.json(docs);
				});
	});
});
var port = 8000 ;
app.listen(port);