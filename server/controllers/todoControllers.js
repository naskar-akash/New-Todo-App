const todoModel = require("../models/todo-model");
const userModel = require("../models/user-model");
const { dateTime } = require("../utils/dateTime");

module.exports.createTodos = async (req, res) => {
  const {todoTitle,todoDesc} = req.body;
   
  try {
    const todo = await todoModel.create({
      todoTitle,
      todoDesc, 
      user: req.user._id
    });
    await userModel.findByIdAndUpdate(req.user._id, {$push:{todos: todo._id}}, {new: true});

    await userModel.findById(req.user._id).populate("todos");

    res.status(201).json({message: "Todo added successfully!"});
  } catch (err) {
     res.status(400).json({ message: err.message });;
  }
};

module.exports.getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find({ user: req.user._id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports.updateTodos = async (req, res) => {
  const {id} = req.params;
  const {todoTitle, todoDesc, status} = req.body;
  const {date, time} = dateTime();

  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      {_id: id, user: req.user._id}, 
      {todoTitle, todoDesc, date, time, status}, 
      {new: true});

    if(!updatedTodo) return res.status(404).json({ error: "Todo not found!" });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
}

module.exports.deleteTodos = async (req, res) => {
  const {id} = req.params;

  try {
    const deletedTodo = await todoModel.findOneAndDelete(
      {_id: id, user: req.user._id});

     if(!deletedTodo) return res.status(404).json({ error: "Todo not found!" });

     await userModel.findByIdAndUpdate(req.user._id,{ $pull: { todos: id }});

     res.status(200).json({ message: "Todo deleted successfully" });

  } catch (error) {
    res.status(400).json({ error: err.message });
  }
}