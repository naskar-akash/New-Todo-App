const express = require('express')
const router = express.Router()
const todoModel = require("../models/todo-model")
const {isLoggedin} = require("../middlewares/isLoggedin")
const { createTodos, getTodos, updateTodos, deleteTodos } = require('../controllers/todoControllers')

//Route to create todos
router.post('/',isLoggedin, createTodos)

//Route to get todos for logged in user
router.get('/', isLoggedin, getTodos);

//Route to update todos for logged in user
router.put('/:id', isLoggedin, updateTodos);

//Route to delete todos for logged in user
router.delete('/:id', isLoggedin, deleteTodos);

module.exports = router