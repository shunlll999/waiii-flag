const express = require('express');
const router = express.Router();
const verifyToken = require('../../midleware/authMiddleware');

const projectEnv = ['PROD', 'DEVELOPMENT', 'QA', 'UAT']
var projects = [];

router.get('/', verifyToken, async (req, res) => {
  res.status(200).json({ user: req.user, projects, projectEnv });
});

router.post('/create', verifyToken, async (req, res) => {
  const { projectName, version, createBy, env } = req.body;
  const existProject = projects.find(project => project.projectName === projectName);
  if (!existProject) {
    const id = String(Date.now());
    projects.push({ projectName, version, createBy, id, env });
    res.status(200).json({ user: req.user, project: { projectName, version, createBy, id, env } });
  } else {
    res.status(402).json({ error: 'Project already exist' });
  }
});

router.put('/update/:id', verifyToken, async (req, res) => {
  const project = projects.find(project => String(project.id).toString() === String(req.params.id).toString());
  if (project) {
    const updateProject = { ...project, ...req.body };
    const index = projects.findIndex((p) => p.id === req.params.id);
    projects[index] = updateProject;
    res.status(200).json({ user: req.user, updated: updateProject, projects });
  } else {
    res.status(404).json({ error: 'not found project' });
  }

});

router.delete('/:id', verifyToken, async (req, res) => {
  res.status(200).json({ user: req.user, message: `Project deleting ::${req.params.id}` });
});

module.exports = router
