const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const authenticate = require("../middleware/check-auth");

router.post("/", authenticate, async (req, res) => {
  try {
    const { name } = req.body;
    const { userId: creator } = req.user;

    const newBoard = {
      name,
      creator,
    };
    const result = await new Board(newBoard).save();
    newBoard.id = result._id;
    res.status(201).send({
      ...newBoard,
    });
    console.info('board created successfully')
  } catch (err) {
    console.warn("Error in POST route of Board api");
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    let boards = await Board.find({}).populate('creator')

    boards = boards.map(board=>({
        id: board._id,
        name: board.name,
        creator:{
            id: board.creator._id,
            firstName: board.creator.firstName,
            lastName: board.creator.lastName,
            email: board.creator.email,
        }
    }))
    res.status(200).send(boards)
    console.info('all boards fetched successfully')
  } catch (err) {
    console.warn("Error in GET all route of Board api");
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
