const router = require("express").Router();

// const mongoose = require('mongoose');

const Project = require('../models/Project.model');
const Task = require('../models/Task.model');

// Create new project
router.post('/projects', (req, res, next) => {
  const { title, description } = req.body;

  const newProject = { 
        title,
        description,
        tasks: [] 
    }

    Project.create(newProject)
    .then(response => res.json(response))
    .catch(err => {
        console.log("error creating a new project", err);
        res.status(500).json({
            message: "error creating a new project",
            error: err
        });
    })
})

module.exports = router;
