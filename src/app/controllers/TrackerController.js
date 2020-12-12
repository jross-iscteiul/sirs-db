const jwt = require("jsonwebtoken");

const Tracker = require("../models/Tracker");
const User = require("../models/User");
require("dotenv").config();

class TrackerController {
  async index(req, res) {
    const trackers = await Tracker.findAll();
    return res.json(trackers);
  }

  async store(req, res) {
    const { trackerlist, token, phone_number } = req.body;

    const payload = jwt.verify(token, process.env.EMAIL_SECRET);

    console.log("payload: " + payload.phone_number);
    console.log("phone_number: " + phone_number);
    if (payload.phone_number != phone_number) {
      return res.statu(401).json({ error: "invalid token" });
    }

    await User.update(
      { positive: true },
      { where: { phone_number: phone_number } }
    );

    trackerlist.forEach(async (elem) => {
      console.log(elem);
      const tracker = {
        trackerkey: elem.trackerkey,
        location: elem.location,
        date: elem.date,
        grain: elem.grain,
      };

      await Tracker.create(tracker);
    });
    return res.status(200).json({});
  }
}

module.exports = new TrackerController();
