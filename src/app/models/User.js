const Sequelize = require("sequelize");
const { Model } = Sequelize;
const bcrypt = require("bcryptjs");
const Crypto = require("crypto");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        phone_number: Sequelize.INTEGER,
        verified: Sequelize.BOOLEAN,
        positive: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        const passwordb64 = Crypto.createHash("sha256")
          .update(user.password)
          .digest("base64");
        user.password_hash = await bcrypt.hash(passwordb64, 14);
      }
    });

    return this;
  }

  static associate(models) {}

  checkPassword(password) {
    const passwordb642 = Crypto.createHash("sha256")
      .update(password)
      .digest("base64");
    return bcrypt.compare(passwordb642, this.password_hash);
  }
}

module.exports = User;
