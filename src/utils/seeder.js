import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import Project from '../models/Project.model.js';
import Task from '../models/Task.model.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '123456'
  }
];

const projects = [
  {
    name: 'Website Redesign',
    description: 'UI/UX overhaul for client website'
  },
  {
    name: 'Mobile App Development',
    description: 'Building a new mobile application for iOS and Android'
  },
  {
    name: 'Marketing Campaign',
    description: 'Q4 marketing campaign for product launch'
  }
];

const tasks = [
  {
    title: 'Design homepage mockup',
    description: 'Create wireframes and mockups for the new homepage design',
    status: 'todo',
    priority: 'high',
    deadline: new Date('2025-09-25')
  },
  {
    title: 'Implement user authentication',
    description: 'Set up JWT authentication for the application',
    status: 'in-progress',
    priority: 'high',
    deadline: new Date('2025-09-30')
  },
  {
    title: 'Write API documentation',
    description: 'Document all API endpoints and their usage',
    status: 'todo',
    priority: 'medium',
    deadline: new Date('2025-10-05')
  },
  {
    title: 'Create database schema',
    description: 'Design and implement the database schema',
    status: 'done',
    priority: 'high',
    deadline: new Date('2025-09-20')
  },
  {
    title: 'Set up CI/CD pipeline',
    description: 'Configure continuous integration and deployment',
    status: 'in-progress',
    priority: 'medium',
    deadline: new Date('2025-10-10')
  }
];

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();

    // Insert users using the model to trigger password hashing
    const createdUsers = [];
    for (const user of users) {
      const newUser = new User(user);
      const savedUser = await newUser.save();
      createdUsers.push(savedUser);
    }
    console.log('Users seeded successfully');

    // Insert projects
    const projectsWithUser = projects.map(project => ({
      ...project,
      createdBy: createdUsers[0]._id
    }));
    const createdProjects = await Project.insertMany(projectsWithUser);
    console.log('Projects seeded successfully');

    // Insert tasks
    const tasksWithRefs = tasks.map((task, index) => ({
      ...task,
      projectId: createdProjects[index % createdProjects.length]._id,
      createdBy: createdUsers[0]._id
    }));
    await Task.insertMany(tasksWithRefs);
    console.log('Tasks seeded successfully');

    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();

    console.log('Data destroyed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  seedData();
}