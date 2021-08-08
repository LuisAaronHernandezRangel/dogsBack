
const Advertisement = require("../models/perroAdv.model");
const Dueno = require("../models/dueno.model");

module.exports = {
  
  //crear un adv
  async create(req, res) {
    try {
      const { body, userId } = req.params;

      const advertisement = await Advertisement.create({
        ...body,
        dueno: userId,
      });
      const dueno = await Dueno.findById(userId);
      dueno.posts.push(advertisement._id);
      await dueno.save({ validateBeforeSave: false });
      res.status(201).json(advertisement);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log(err.message);
    }
  },
//get los adv de un dueño
  async list(req, res) {
    try {
      const { userId } = req;
      const adver = await Advertisement.find({ dueno: userId });
      res.status(201).json(adver);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  //muestra un adv especifico del dueño
  async show(req, res) {
    try {
      const { adverId } = req.params;
      const adver = await Advertisement.findById(adverId)
        .populate("Dueno")
      res.status(200).json(adver);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  //actualiza un adver en especifico
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
      res.status(200).json("ha sido eliminado");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // async showAll(req, res) {
  //   const {city} = req.query;

    //const days = JSON.parse(selectedDays);

    // let filters = {};
    // let Iso8001Days = [];

    // if (days[0] === "") {
    //   filters = {};
    // } else {
    //   Iso8001Days = days.map((day) => new Date(day));
    // }

    // const Iso8001DaysString = Iso8001Days.map((day) => day.toISOString());

        // try {
    //   if (Iso8001DaysString) {
    //     filters.selectedDays = { $in: Iso8001DaysString };
    //   }
    //   const reservations = await Reservation.find(filters);
    //   const reservedAdsIds = reservations.map(
    //     (reservation) => reservation.advertisementId
    //   );
  //     let ads = "";
  //     if (city) {
  //       ads = await Advertisement.find({
  //         _id: { $nin: reservedAdsIds },
  //         city,
  //       });
  //     } else {
  //       ads = await Advertisement.find({
  //         _id: { $nin: reservedAdsIds },
  //       });
  //     }
  //     res.status(200).json(ads);
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },
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
