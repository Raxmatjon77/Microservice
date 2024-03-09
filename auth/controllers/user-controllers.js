let User = require('../models/user')
const bcrypt = require('bcrypt')
class UserController {
  async getAllUsers(req, res, next) {
    let users;
    try {
      users = await User.find();
    } catch (error) {
      console.log(error);
    }
    if (!users) {
      console.log(users);
      return res.status(404).json({
        message: "no users found",
      });
    }
    console.log(".....>>>");
    return res.status(200).json({
      data: users,
    });
  }
  async login(req, res, next) {
    const { email, password } = req.body;

    let existuser;
    try {
      existuser = await User.findOne({ email });
    } catch (error) {
      console.log(error);
    }

    if (!existuser) {
      return res.status(400).json({
        message: "coulnot find any user by this email !",
      });
    }

    const isPassCorrect = bcrypt.compareSync(password, existuser.password);
    if (!isPassCorrect) {
      return res.status(400).json({
        message: "wrong password!",
      });
    }

    return res.status(200).json({
      message: "you have  successfuly logged in  !",
    });
  }

  async signUp(req, res, next) {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    let existuser;
    try {
      existuser = await User.findOne({ email });
    } catch (error) {
      console.log(error);
    }

    if (existuser) {
      return res.status(400).json({
        message: "user  have already registered ",
      });
    }
    const saltRounds = 10;

    // Generate a salt
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(password,salt);
    const user =  new User({
      username,

      email,
      password: hashedPass,
      blog: [],
    });
    try {
      await user.save();
    } catch (error) {
      console.log(error);
    }
    return res.status(201).json({
      data: user,
    });
  }

}
module.exports = new UserController