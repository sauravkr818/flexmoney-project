const Validator = require("validator");
const isEmpty = require("is-empty");

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  console.log("age", age);
  return age;
}

module.exports = function validateRegisterInput(data) {
  
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.err = "Name field is required";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.err = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.err = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.err = "Password field is required";
  }
if (Validator.isEmpty(data.password2)) {
    errors.err = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.err = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.err = "Passwords must match";
  }
  if (Validator.isEmpty(data.dob)) {
    errors.err = "Date of Birth is required";
  }

  if(getAge(data.dob) < 18 || getAge(data.dob) > 65){
    errors.err = "Sorry your age is not b/w 18-65";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};