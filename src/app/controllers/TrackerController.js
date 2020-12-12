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
   // console.log(entrou);
    const { trackerlist, token, phone_number } = req.body;
    var payload=null;
try{
   payload = jwt.verify(token, process.env.EMAIL_SECRET);

console.log("payload:"+payload.phone_number)
console.log("ph:" + phone_number)
    if (payload.phone_number != phone_number) {
      return res.json({code:1, error: "invalid token" });
    }
  }catch(err){
    return res.json({code:1, error: "invalid token sdd" });
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
    console.log("Bom trabalho!")
    return res.json({code:0});
  }
}

module.exports = new TrackerController();
