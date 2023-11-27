const User = require("../modules/user");
const Movies = require("../modules/movies");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("../utils/jsonwebtoken");
exports.create = async (req, res) => {
  const { name, category, description } = req.body;
  const movie = Movies({ name, category, description });
  await movie.save();
  res.json({
    message: "create ✅",
    data: movie,
  });
};
exports.find = async (req, res) => {
  const { id } = req.params;
  const themovie = await Movies.findById(id).select("-reviews");
  if (!themovie) return res.status(404).send();
  res.json({
    message: "find ✅",
    data: themovie,
  });
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, category, description } = req.body;
  await Movies.updateOne(
    { _id: id },
    {
      $set: {
        name,
        category,
        description,
      },
    }
  );
  res.json({
    message: "update ✅",
  });
};
exports.delete = async (req, res) => {
  const { id } = req.params;
  await Movies.deleteOne({ _id: id });
  res.json({ message: "delete ✅" });
};
exports.list = async (req, res) => {
  const page = req.query?.page || 1;
  const limit = 2;
  const skip = (page - 1) * limit;
  const movies = await Movies.find().select("-reviews").skip(skip).limit(limit);
  const total = await Movies.countDocuments();
  const pages = Math.ceil(total / limit);
  res.json({
    message: "list ✅",
    page: `${req.query.page}/${pages}`,
    data: movies,
  });
};
exports.reviews = async (req, res) => {
  const { id } = req.params;
  const movie = await Movies.findById(id)
    .select("-reviews._id")
    .populate("reviews.user", "name");
  if (!movie) return res.status(404).send();
  res.json({
    message: "reviews ✅",
    data: movie.reviews,
  });
};
exports.addreviews = async (req, res) => {
  const { id } = req.params;
  const { comment, rate } = req.body;
  const movie = await Movies.findById(id);
  if (!movie) return res.status(404).send();
  const isRated = movie.reviews.findIndex((m) => m.user == req.userId);
  if (isRated > -1)
    return res
      .status(403)
      .send({ message: "Information has already been entered ✔" });
  const totalRate = movie.reviews.reduce((sum, review) => sum + review.rate, 0);
  const finalRate = (totalRate + rate) / (movie.reviews.length + 1);
  await Movies.updateOne(
    {
      _id: id,
    },
    {
      $push: {
        reviews: {
          user: req.userId,
          comment,
          rate,
        },
      },
      $set: { rate: finalRate },
    }
  );
  res.status(201).json({
    message: "addreviews ✅",
  });
};
