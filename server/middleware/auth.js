const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

module.exports = (token) => {
  if (token) {
    const newtoken = token.split("Bearer ")[1];
    try {
      const user1 = jwt.verify(newtoken, "UNSAFE SRING", (err, user) => {
        if (err) {
          throw new AuthenticationError("Invalid Token");
        }
        return user;
      });
      return user1;
    } catch (error) {
      throw new AuthenticationError("Invalid or Expired Token");
    }
  } else {
    throw new AuthenticationError("Not Authentication '");
  }
};
