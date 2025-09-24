import Task from '../models/Task.model.js';
import Project from '../models/Project.model.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, deadline, projectId } = req.body;

  // Check if project exists
  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    deadline,
    projectId,
    createdBy: req.user._id
  });

  res.status(201).json(task);
});

// @desc    Get tasks by project with filters and pagination
// @route   GET /api/tasks
// @access  Private
const getTasksByProject = asyncHandler(async (req, res) => {
  const { projectId, status, priority, deadlineFrom, deadlineTo, page = 1, limit = 10 } = req.query;

  // Build filter object
  let filter = { createdBy: req.user._id };
  
  if (projectId) {
    filter.projectId = projectId;
  }
  
  if (status) {
    filter.status = status;
  }
  
  if (priority) {
    filter.priority = priority;
  }
  
  if (deadlineFrom || deadlineTo) {
    filter.deadline = {};
    if (deadlineFrom) {
      filter.deadline.$gte = new Date(deadlineFrom);
    }
    if (deadlineTo) {
      filter.deadline.$lte = new Date(deadlineTo);
    }
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  const tasks = await Task.find(filter)
    .limit(limit * 1)
    .skip(skip)
    .sort({ createdAt: -1 });

  const total = await Task.countDocuments(filter);

  res.json({
    tasks,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Check if user is the owner of the task
  if (task.createdBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  task.priority = priority || task.priority;
  task.deadline = deadline || task.deadline;

  const updatedTask = await task.save();
  res.json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Check if user is the owner of the task
  if (task.createdBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await task.deleteOne();
  res.json({ message: 'Task removed' });
});

export { createTask, getTasksByProject, updateTask, deleteTask };