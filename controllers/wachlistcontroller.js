const User = require("../modules/user");
exports.add = async (req, res) => {
  const { movie, watched } = req.body;
  const user = await User.findById(req.userId);
  const index = user.watchList.findIndex((e) => e.movie == movie);
  if (index > -1) {
    user.watchList[index].watched = watched;
  } else {
    user.watchList.push({ movie, watched });
  }
  await user.save();
  res.json({
    message: "add ✅",
  });
};
exports.delete = async (req, res) => {
  const { movie } = req.params;
  const user = await User.findById(req.userId);
  user.watchList = user.watchList.filter((e) => e.movie != movie);
  await user.save();
  res.json({ message: "delete ✅" });
};
exports.list = async (req, res) => {
  const user = await User.findById(req.userId)
    .select("-watchList._id")
    .populate("watchList.movie", ["name", "category"]);
  res.json({
    message: "list ✅",
    data: user.watchList,
  });
};
