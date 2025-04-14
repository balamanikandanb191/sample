const express = require('express');
const router = express.Router();
const Task = require('../models/task'); 
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Error creating task', error: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Error updating task', error: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting task', error: err.message });
  }
});

module.exports = router;
