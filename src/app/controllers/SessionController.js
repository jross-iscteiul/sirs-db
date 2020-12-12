const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authConfig = require("../../config/auth");

class SessionController {
  async store(req, res) {
    const { phone_number, password } = req.body;

    const user = await User.findOne({ where: { phone_number } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    if (!user.verified) {
      return res.status(401).json({ error: "Email not confirmed" });
    }

    const { id } = user;

    return res.json({
      user: {
        id,
        phone_number,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
