import * as taskService from '../services/task.service.js';

export const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.user);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await taskService.updateTaskStatus(
      Number(req.params.id),
      req.body.status,
      req.user
    );
    res.json(task);
  } catch (err) {
    next(err);
  }
};
