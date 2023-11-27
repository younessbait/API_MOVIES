const User = require("../modules/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("../utils/jsonwebtoken");
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    return res.status(200).json({
      message: "valid ✅",
      data: {
        name: user.name,
        email: user.email,
        accessToken: jsonwebtoken.sign({ sub: user.id }),
      },
    });
  }
  res.status(500).json({ message: "something went wrong ❎" });
};
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = User({
    name,
    email,
    password: bcrypt.hashSync(password, 8),
  });
  try {
    await user.save();
    res.status(200).json({ message: "success ✅" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong ❎" });
  }
};
exports.me = async (req, res) => {
  const user = await User.findById(req.userId);
  res.status(200).json({
    message: "valid ✅",
    data: {
      name: user.name,
      email: user.email,
    },
  });
};
