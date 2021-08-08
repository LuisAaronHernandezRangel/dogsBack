const Heroe = require("../models/heroe.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { welcomeRoomie } = require("../utils/mailer");

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;
      const heroe = await Heroe.create(body);
      const token = jwt.sign({ userId: heroe._id }, process.env.SECRET, {expiresIn: 60 * 60 * 24 * 365,});
      // await welcomeRoomie(heroe)
      res.status(201).json({ token });
      
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;

      const heroe = await Heroe.findOne({ email });

      if (!heroe) {
        throw new Error("Password or invalid email");
      }

      const isValid = await bcrypt.compare(password, heroe.password);

      if (!isValid) {
         throw new Error("Password or invalid email");
      }

      const token = jwt.sign({ userId: heroe._id }, process.env.SECRET, {expiresIn: 60 * 60 * 24 * 365,});

      res.status(201).json({ token });
    } catch (error) {
      console.log("ERROR", error.message);

      res.status(400).json({ message: error.message });
    }
  },

  async list(req, res) {
    try {
      const heroes = await Heroe.find().populate("Advertisement");
      res.status(200).json(heroes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async show(req, res) {
    try {
      const { heroe } = req;
      const profile = await Heroe.findById(heroe);
      res.status(200).json(profile);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { heroe, body } = req;
      const profile = await Heroe.findByIdAndUpdate(heroe, body, {
        new: true,
      });
      res.status(200).json(profile);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.dir(err.message);
    }
  },

  async photoProfile(req, res) {
    try {
      const { heroe, body } = req;

      if (body.photos.length === 0) {
        body.photos[0] =
          "https://res.cloudinary.com/evollve-sas/image/upload/v1627351292/roomatch/166-1666981_silhouette-unknown-people-hd-png-download_gnkzz1.jpg";
      }
      const profilePhoto = await Heroe.findByIdAndUpdate(
        heroe,
        { photos: body.photos[0] },
        {
          new: true,
        }
      );
      res.status(201).json(profilePhoto);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

//   async destroy(req, res) {
//     try {
//       const { roomieId } = req.params;
//       const roomie = await UserHost.findByIdAndDelete(roomieId);
//       res.status(400).json(roomie);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   },
};