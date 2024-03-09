const bcrypt = require("bcrypt");
const Support = require("./support-model");
class SupportController{
  async createSupport(req, res, next) {
    const { fullName, topic, text } = req.body;
    if (topic && text && fullName) {
    //   console.log(fullName, expireMonth, cardNumber);
      try {
       
        const support = new Support({
          fullName,
          text,
          topic,
        });
        try {
          await support.save();
        } catch (error) {
          console.log(error);
        }
        return res.status(201).json({
          data: support,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      return res.status(404).json({
        message: "all fields are required !",
      });
    }
  }
  async getAll(req, res, next) {
    let support;
    try {
      support = await Support.find();
    } catch (error) {
      console.log(error);
    }
    if (!support) {
      console.log(support);
      return res.status(404).json({
        message: "no support found",
      });
    }
    console.log(".....>>>");
    return res.status(200).json({
      data: support,
    });
  }
}

module.exports = new SupportController();
