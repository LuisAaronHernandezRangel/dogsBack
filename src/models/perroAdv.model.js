const { Schema, model } = require("mongoose");

const adverSchema = new Schema(
  {   

      title: {
      type: String,
      required: true,
    },

      name_dog: {
      type: String,
      required: true,
    },
    dueno: {
      type: Schema.Types.ObjectId,
      ref: "Dueno",
      required: true,
    },
    Type_pet: { type: String, required: [true, "The field is required"] },
    description: { type: String, required: [true, "The field is required"] },
    photos: { type: [String], required: [true, "The field is required"] },
    price: { type: Number, required: [true, "The field is required"] },
    city: { type: String, required: [true, "The field is required"] },
    advertisements: [{ type: Schema.Types.ObjectId, ref: "Advertisement" }],
    comments:{ type: [String], required: [true, "The field is required"] }
  },

  {
    timeStamps: true,
  }
);

const Advertisement = model("Advertisement", adverSchema);

module.exports = Advertisement;
