const { User } = require("../models");
const { signToken } = require("../Middlewares/auth");


  // get a single user by id or username
  const getSingleUser = async({ user = null, params }, res) => {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    })
      .select("-__v")
      .populate("cardio")
      .populate("resistance")

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  }

  // create a user, sign a token, and send it back to sign up page
  const createUser = async({ body }, res)  => {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: "Something is wrong!" });
    }
    const token = signToken(user);
    res.json({ token, user });
  }

  // login a user, sign a token, and send it back to login page
  const login = async({ body }, res) => {
    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: "Wrong password!" });
    }
    const token = signToken(user);
    res.json({ token, user });
  }

  module.exports = {
    createUser,
    login,
    getSingleUser,
  }