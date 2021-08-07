const Dueno = require("../models/dueno.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {welcomeHost} = require("../utils/mailer")

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;
      const dueno = await Dueno.create(body);
      const token = jwt.sign({ userId: dueno._id }, "" + process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      await welcomeHost(dueno)
      res.status(201).json({ token, message: "check your email" });
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },
  async list(req, res) {
    try {
      const dueno = await Dueno.find();
      res.status(201).json(userh);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { heroe, body } = req;
      if (body.photos.length === 0) {
        body.photos[0] =
          "https://res.cloudinary.com/evollve-sas/image/upload/v1627351292/roomatch/166-1666981_silhouette-unknown-people-hd-png-download_gnkzz1.jpg";
      }
      const profile = await UserHost.findByIdAndUpdate(heroe, body, {
        new: true,
      });
      res.status(200).json(profile);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.dir(err.message);
    }
  },

//   async destroy(req, res) {
//     try {
//       const { duenoId } = req.params;
//       const userh = await UserHost.findByIdAndDelete(duenoId);
//       res.status(400).json(userh);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//       console.log({ message: err.message });
//     }
//   },

  async signin(req, res) {
    try {
      const { password, email } = req.body;
      const user = await Dueno.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign({ userId: user._id }, "" + process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });

      res.status(201).json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },
  async show(req, res) {
    try {
      const { heroe } = req;
      const profile = await UserHost.findById(heroe);
      res.status(200).json(profile);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};
