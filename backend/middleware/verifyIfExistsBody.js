const errorMessages = require("../config/errorMessages");

const verifyIfExistsBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body)
    return res.status(400).json({ message: errorMessages.WITHOUT_BODY });

  next();
};

module.exports = verifyIfExistsBody;
