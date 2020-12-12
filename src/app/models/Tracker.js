const Sequelize = require("sequelize");
const { Model } = Sequelize;

class Tracker extends Model {
  static init(sequelize) {
    super.init(
      {
        trackerkey: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.STRING,
        grain: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {}
}

module.exports = Tracker;
