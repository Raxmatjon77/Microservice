const bcrypt = require("bcrypt");
const Payment = require("./pay-model");
class PayController {
  async createPayment(req, res, next) {
    const { fullName, expireMonth, cardNumber } = req.body;
    if (cardNumber && expireMonth && fullName) {
      console.log(fullName, expireMonth, cardNumber);
      try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedCArd = bcrypt.hashSync(cardNumber, salt);
        const payment = new Payment({
          fullName,
          expireMonth,
          cardNumber: hashedCArd,
        });
        try {
          await payment.save();
        } catch (error) {
          console.log(error);
        }
        return res.status(201).json({
          data: payment,
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
    let payment;
    try {
      payment = await Payment.find();
    } catch (error) {
      console.log(error);
    }
    if (!payment) {
      console.log(payment);
      return res.status(404).json({
        message: "no payment found",
      });
    }
    console.log(".....>>>");
    return res.status(200).json({
      data: payment,
    });
  }
}

module.exports = new PayController();
