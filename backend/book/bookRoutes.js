const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const verifyIfExistsBody = require("../middleware/verifyIfExistsBody");

const BookController = require("./BookController");

const bookRouter = express.Router();

BookController.createTable();

bookRouter.get("/", BookController.listAll);

module.exports = bookRouter;
