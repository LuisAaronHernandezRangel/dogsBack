
const Advertisement = require("../models/perroAdv.model");
const Dueno = require("../models/dueno.model");

module.exports = {
  async create(req, res) {
    try {
      const { body, heroe } = req;

      const advertisement = await Advertisement.create({
        ...body,
        dueno: heroe,
      });
      const dueno = await Dueno.findById(heroe);
      dueno.posts.push(advertisement._id);
      await host.save({ validateBeforeSave: false });
      res.status(201).json(advertisement);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log(err.message);
    }
  },

  async list(req, res) {
    try {
      const { heroe } = req;
      const adver = await Advertisement.find({ dueno: heroe });
      res.status(201).json(adver);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

//   async show(req, res) {
//     try {
//       const { adverId } = req.params;
//       const adver = await Advertisement.findById(adverId)
//         .populate("host")
//         .populate("reservations");
//       res.status(200).json(adver);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   },

  async update(req, res) {
    try {
      const {
        params: { adverId },
        body,
      } = req;
      const adver = await Advertisement.findByIdAndUpdate(adverId, body, {
        new: true,
      });
      res.status(200).json(adver);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const { adverId } = req.params;
      const adver = await Advertisement.findByIdAndDelete(adverId);
      res.status(200).json(adver);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async showAll(req, res) {
    const {city} = req.query;

    //const days = JSON.parse(selectedDays);

    // let filters = {};
    // let Iso8001Days = [];

    // if (days[0] === "") {
    //   filters = {};
    // } else {
    //   Iso8001Days = days.map((day) => new Date(day));
    // }

    // const Iso8001DaysString = Iso8001Days.map((day) => day.toISOString());

        try {
    //   if (Iso8001DaysString) {
    //     filters.selectedDays = { $in: Iso8001DaysString };
    //   }
    //   const reservations = await Reservation.find(filters);
    //   const reservedAdsIds = reservations.map(
    //     (reservation) => reservation.advertisementId
    //   );
      let ads = "";
      if (city) {
        ads = await Advertisement.find({
          _id: { $nin: reservedAdsIds },
          city,
        });
      } else {
        ads = await Advertisement.find({
          _id: { $nin: reservedAdsIds },
        });
      }
      res.status(200).json(ads);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async updateComment(req,res){
    try{
    const { body, params } = req
    if (body.comments.length === 0) {
      body.comments[0] = 
        "escríbenos tu comentario aquí";
    }
    const comments = await Lesson.findByIdAndUpdate(lessonId, { comments: body.comments }, {new: true,});

  let updatedLesson;
  lessons = lessons.map(lesson => {
    if(lesson._id === params.lessonId) {
      const comments = [ ...lesson.comments, body.comment]
      

      updatedLesson = {
        ...lesson,
        comments,
        
      }

      return updatedLesson
    }
    return lesson
  })

  res.status(200).json({ message: 'El comentario se actualizó', lesson: updatedlesson , comments })
} catch (err) {
  res.status(400).json({ message: err.message });
  console.log(err.message);
}
},
};
