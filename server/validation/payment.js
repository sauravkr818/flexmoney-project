const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePaymentInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.err = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.err = "Email is invalid";
  }
  console.log("isEmpty(errors)");
return {
    errors,
    isValid: isEmpty(errors)
  };
};
