import express from 'express';
import { createTask, getTasksByProject, updateTask, deleteTask } from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTask)
  .get(protect, getTasksByProject);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;