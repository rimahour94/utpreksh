const emailRegEx =
  /^[a-zA-Z0987654321`.~!@#$%^&*()_-]{3,}[@][a-zA-Z.!@#$%^*()_]{3,}[.][a-zA-Z]{2,3}$/;
const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?.&]{8,}$/;
export { emailRegEx, passwordRegEx };
