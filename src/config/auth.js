require("dotenv").config();

module.exports = {
  secret: "743357d16bcef31a1257be136812e88e",
  emailSecret: process.env.EMAIL_SECRET,
  expiresIn: "7d",
};
