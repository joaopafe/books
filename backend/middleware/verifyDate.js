const validateBook = require("../../shared/utils/validateDate");
const errorMessages = require("../config/errorMessages");

const verifyDate = (req, res, next) => {
  const publicationDate = req.body.publicationDate;

  const isValidBook = validateBook(publicationDate);

  if (isValidBook) {
    next();
  } else {
    return res
      .status(400)
      .json({ message: errorMessages.PUBLICATION_DATE_INVALID });
  }
};

module.exports = verifyDate;
