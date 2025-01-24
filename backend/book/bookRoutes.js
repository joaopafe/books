const express = require("express");

const { celebrate, Joi, Segments } = require("celebrate");

const verifyIfExistsBody = require("../middleware/verifyIfExistsBody");
const verifyIfExistsBook = require("../middleware/verifyIfExistsBook");
const verifyDate = require("../middleware/verifyDate");
const BookController = require("./BookController");

BookController.createTable();

const bookRouter = express.Router();

bookRouter.get("/", BookController.listAll);

bookRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  verifyIfExistsBook,
  BookController.listById
);

bookRouter.post(
  "/",
  verifyIfExistsBody,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(5).required(),
      author: Joi.string().min(5).required(),
      publicationDate: Joi.string().min(10).max(10),
      description: Joi.string().min(5).required(),
      image: Joi.string().base64().required(),
    }),
  }),
  verifyDate,
  BookController.create
);

bookRouter.put(
  "/:id",
  verifyIfExistsBody,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  verifyIfExistsBook,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(5).required(),
      author: Joi.string().min(5).required(),
      publicationDate: Joi.string().min(10).max(10),
      description: Joi.string().min(5).required(),
      image: Joi.string().base64().required(),
    }),
  }),
  verifyDate,
  BookController.update
);

bookRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  verifyIfExistsBook,
  BookController.delete
);

module.exports = bookRouter;
