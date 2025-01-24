const validateBook = require("../../shared/utils/validateDate");

const verifyDate = (req, res, next) => {
  const publicationDate = req.body.publicationDate;

  const isValidBook = validateBook(publicationDate);

  if (isValidBook) {
    next();
  } else {
    return res.json({ message: "Publication date invalid" });
  }
};

module.exports = verifyDate;
