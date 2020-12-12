const User = require("../models/User");

const jwt = require("jsonwebtoken");
const auth = require("../../config/auth");

const util = require("util");
const { promisify } = util;
const Mail = require("../../lib/Mail");

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async store(req, res) {
    /**
     * Validate if the data inserted by the user is correct.
     */
    const data = req.body;

    const { email, password, phone_number } = data;

    /* console.log(this.CheckPassword(password)); */
    const passRules = new RegExp(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])^[A-Za-z0-9 ]+$/
    );
    if (!passRules.test(password)) {
      return res
        .status(400)
        .json({ error: "Invalid Password check your params" });
    }

    const phoneRules = new RegExp(/^([0-9]{9})/);
    if (!phoneRules.test(phone_number)) {
      return res
        .status(400)
        .json({ error: "Invalid PhoneNumber check your params" });
    }

    const userExists = await User.findOne({ where: { email: email } });
    const userPhoneExists = await User.findOne({
      where: { phone_number: phone_number },
    });

    if (userExists || userPhoneExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const { id } = await User.create({
      email,
      password,
      phone_number,
    });

    jwt.sign({ id }, auth.emailSecret, { expiresIn: "1d" }, (err, token) => {
      const url = `http://localhost:8080/confirmEmail/${token}`; //atualizar para pagina do front quando tiver feita
      Mail.sendMail({
        to: email,
        subject: "Confirm Your Account",
        html: `Please click this <a href="${url}">link</a> to confirm you acc`,
      });
    });
    return res.json({
      id: id,
      email: email,
      phone_number: phone_number,
    });
  }

  async confirmEmail(req, res) {
    try {
      const { id } = await promisify(jwt.verify)(
        req.params.token,
        auth.emailSecret
      );
      await User.update({ verified: true }, { where: { id } });
    } catch (e) {
      return res.status(401).json({ error: "Could not verify your email!" });
    }

    return res.status(200).json({ success: "Your Email has been Confirmed!" });
  }
}

module.exports = new UserController();
