import express from 'express';
import { createProject, getProjects, deleteProject } from '../controllers/project.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createProject)
  .get(protect, getProjects);

router.route('/:id')
  .delete(protect, deleteProject);

export default router;