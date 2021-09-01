const { Schema, model } = require("mongoose");

const adverSchema = new Schema(
  {   

      title: {
      type: String,
      required: false,
    },

      name_dog: {
      type: String,
      required: false,
    },
    dueno: {
      type: Schema.Types.ObjectId,
      ref: "Dueno",
      required: false,
    },
    type_pet: { type: String, required: [false, "The field is required"] },
    description: { type: String, required: [false, "The field is required"] },
    image: { type: String, required: [false, "The field is required"] },
    city: { type: String, required: [false, "The field is required"] },
    contact:{type: String, required: [false, "The field is required"] },
    advertisements: [{ type: Schema.Types.ObjectId, ref: "Advertisement" }],
    comments:{ type: [String], required: [false, "The field is required"] }
  },

  {
    timeStamps: true,
  }
);

const Advertisement = model("Advertisement", adverSchema);

module.exports = Advertisement;
