const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

const Mail = require("../../lib/Mail");

class TokenController {
  async store(req, res) {
    const { password, phone_number } = req.body;
    if (process.env.SHA_256_KEY == password) {
      const user = await User.findOne({
        where: { phone_number: phone_number },
      });
      jwt.sign(
        { phone_number: phone_number },
        process.env.EMAIL_SECRET,
        {
          algorithm: "HS512",
          expiresIn: "1d",
        },
        (err, token) => {
          //atualizar para pagina do front quando tiver feita
          Mail.sendMail({
            to: user.email,
            subject: "COVID TOKEN",
            html: `Please submit this token - <strong>${token}</strong> - to confirm you are infected`,
          });
        }
      );
    } else {
      return res.json({code:1, error: "Invalid Credencials" });
    }

    return res.json({code:0, Success: "A email was sent" });
  }
}

module.exports = new TokenController();
