var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../helpers/todos');

router.route('/')
.get(helpers.getToDos)
.post(helpers.postTodos)

router.route('/:todoId')
.get(helpers.getToDo)
.put(helpers.updateTodo)
.delete(helpers.deleteTodo)

module.exports = router;
