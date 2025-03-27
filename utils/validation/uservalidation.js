import { emailRegEx, passwordRegEx } from "../regex/regex.js";

const validate = (regEx, value) => {
  if (regEx === "email") {
    return emailRegEx.test(value);
  } else if (regEx === "password") {
    return passwordRegEx.test(value);
  }
};

export { validate };
