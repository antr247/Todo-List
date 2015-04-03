var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');

router.get('/api/todos', function(req, res) 
{
	Post.find(function(err, todos)
	{
		if(err)
			res.send(err);
		res.json(todos);
	});
});

router.post('/api/todos', function(req, res)
{
	Post.create
	({
		text: req.body.text,
		done: false
		}, function(err, todo)
		{
			if (err)
				res.send(err);
			
				Post.find(function(err, todos) {
					if (err)
						res.send(err)
					res.json(todos);
				});
		});
});

router.delete('/api/todos/:todo_id', function(req, res)
{
	Post.remove({
		_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);
			
				Post.find(function(err, todos) {
					if (err)
						res.send(err)
					res.json(todos);
				});
			});
});
			
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Todo List' });
});

module.exports = router;
