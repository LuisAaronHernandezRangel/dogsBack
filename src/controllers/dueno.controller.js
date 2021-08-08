const Dueno = require("../models/dueno.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const {welcomeHost} = require("../utils/mailer")

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;
      const dueno = await Dueno.create(body);
      const token = jwt.sign({ userId: dueno._id },process.env.SECRET, {expiresIn: 60 * 60 * 24 * 365,});
      //await welcomeHost(dueno)
      res.status(201).json({ token});
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },
  
  async signin(req, res) {
    try {
      const { password, email } = req.body;
      const dueno = await Dueno.findOne({ email });
      if (!dueno) {
        throw new Error("Invalid email or password");
      }
      const isValid = await bcrypt.compare(password, dueno.password);
      if (!isValid) {
      throw new Error("Invalid email or password");
      }

      const token = jwt.sign({ userId: dueno._id },process.env.SECRET, { expiresIn: 60 * 60 * 24 * 365,});

      res.status(201).json({ token });
      
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },
  //ver todos los duenos
  async list(req, res) {
    try {
      const dueno = await Dueno.find().populate("Advertisement");
      res.status(201).json(dueno);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },
  async show(req, res) {
    try {
      const { userId } = req.params;
      const profile = await Dueno.findById(userId);
      res.status(200).json(profile);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  async update(req, res) {
    try {
      const {params:{userId}, body } = req;
      const profile = await Dueno.findByIdAndUpdate(userId, body, {
        new: true,
      });
      res.status(200).json(profile);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.dir(err.message);
    }
  },

  async updatePhoto(req, res) {
    try {
      const {params:{userId}, body } = req;
      console.log(body)
      if (body.photos.length === 0) {
        body.photos[0] =
          "https://res.cloudinary.com/evollve-sas/image/upload/v1627351292/roomatch/166-1666981_silhouette-unknown-people-hd-png-download_gnkzz1.jpg";
      }
      const profile = await Dueno.findByIdAndUpdate(userId, {photos:body.photos[0]}, {
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
//       const { userId } = req.params;
//       const dueno = await Dueno.findByIdAndDelete(duenoId);
//       res.status(400).json(dueno);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//       console.log({ message: err.message });
//     }
//   },
};
