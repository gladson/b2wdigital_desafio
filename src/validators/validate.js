const { check } = require("express-validator");

const validatePlanet = () => [
  check("name")
    .notEmpty()
    .withMessage("Name not empty")
    .isString()
    .withMessage("Name must be String"),
  check("climate")
    .notEmpty()
    .withMessage("Climate not empty")
    .isString()
    .withMessage("Climate must be String"),
  check("ground")
    .notEmpty()
    .withMessage("Ground not empty")
    .isString()
    .withMessage("Ground must be String"),
];

const validator = {
  validatePlanet,
};

module.exports = validator;
