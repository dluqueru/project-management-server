const router = require("express").Router();

const res = require("express/lib/response");
const mongoose = require('mongoose');

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

router.get("/projects", (req, res, next) => {
    Project.find()
        .populate("tasks")
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.log("error getting list of projects", err);
            res.status(500).json({
                message: "error getting list of projects",
                error: err
            });
        })
})


// Get a specific project by id
router.get('/projects/:projectId', (req, res, next) => {
    const { projectId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    // Each Project document has `tasks` array holding `_id`s of Task documents
    // We use .populate() method to get swap the `_id`s for the actual Task documents
    Project.findById(projectId)
      .populate('tasks')
      .then(project => res.status(200).json(project))
      .catch(err => {
        console.log("error getting details of project", err);
        res.status(500).json({
            message: "error getting details of project",
            error: err
        });
    })
  });
  
  
  // PUT  /api/projects/:projectId  -  Updates a specific project by id
  router.put('/projects/:projectId', (req, res, next) => {
    const { projectId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Project.findByIdAndUpdate(projectId, req.body, { new: true })
      .then((updatedProject) => res.json(updatedProject))
      .catch(err => {
        console.log("error updating project", err);
        res.status(500).json({
            message: "error updating project",
            error: err
        });
    })
  });
  
  
  // DELETE  /api/projects/:projectId  -  Deletes a specific project by id
  router.delete('/projects/:projectId', (req, res, next) => {
    const { projectId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Project.findByIdAndRemove(projectId)
      .then(() => res.json({ message: `Project with id ${projectId} is removed successfully.` }))
      .catch(err => {
        console.log("error deleting project", err);
        res.status(500).json({
            message: "error deleting project",
            error: err
        });
    })
  });
  
  
  // ...
  
module.exports = router;
