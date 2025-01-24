const validateDate = (value) => {
  value = `${value}`.trim();

  const regex =
    /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]([0-1][0-9]\d\d$|20[0-2][0-9])/;

  return regex.test(value);
};

module.exports = validateDate;
