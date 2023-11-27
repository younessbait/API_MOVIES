const mongoose = require("mongoose");
const Modelschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          comment: String,
          rate: Number,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
Modelschema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});
const model = mongoose.model("Movie", Modelschema);
module.exports = model;
