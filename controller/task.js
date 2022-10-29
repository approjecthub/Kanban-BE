const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/check-auth");
const Task = require("../models/task");

router.post("/", authenticate, async (req, res) => {
  const { title, description, status, boardId:board, subtasks } = req.body;
  try {
    if (!(title && status && board)) {
      throw new Error(
        "title,status,boardId - are required fields for creating tasks"
      );
    }
    const newTask = await new Task({
      title,
      description,
      status,
      board,
    }).save();
    const parent = newTask._id;

    if (Array.isArray(subtasks) && subtasks.length > 0) {
      const promises = subtasks.map((subtask) => {
        const { title, description, status } = subtask;
        if (!(title && status)) {
          throw new Error(
            "title,status - are required fields for creating subtasks"
          );
        }
        return new Task({
          title,
          description,
          status,
          parent,
          board,
        }).save();
      });

      const subTaskObjs = await Promise.all(promises);
      res.status(201).send({
        ...JSON.parse(JSON.stringify(newTask)),
        subtasks: [...subTaskObjs],
      });
      console.info("task created successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.get("/:boardId", authenticate, async (req, res) => {
  try {
    const { boardId } = req.params;
    const tasks = await Task.find({
      $and: [{ board: boardId }, { parent: null }],
    });
    res.status(200).send(tasks);
    console.info("get tasks by boardId executed successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
module.exports = router;
