
const Advertisement = require("../models/perroAdv.model");
const Dueno = require("../models/dueno.model");

module.exports = {
  
  //crear un adv
  async create(req, res) {
    try {
      const {userId, body } = req;  
      console.log(userId) 
      console.log(body)
      const dueno = await Dueno.findById(userId)
      console.log(dueno)
      if (!dueno) {
        throw new Error("error en el controlador");
      }
      const advertisement = await Advertisement.create({ ...body,
        dueno: userId
        });
      dueno.posts.push(advertisement._id);
     await dueno.save({ validateBeforeSave: false });
      res.status(201).json(advertisement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
//get los adv de un dueño
  // async list(req, res) {
  //   try {
  //     const { userId } = req;
  //     const adver = await Advertisement.find({ dueno: userId });
  //     res.status(201).json(adver);
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },
  async showAll(req, res) {
    const {city} = req.query;
    try{
      let ads = "";
      if (city) {
        ads = await Advertisement.find({
          city,
        });
      } else {
        ads = await Advertisement.find();
      }
      res.status(200).json(ads);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async listAll(req, res) {
    try {
      const { body } = req;
      const adver = await Advertisement.find();
      res.status(201).json(adver);
    } catch (err) {
      res.status(400).json({ message: "error" });
    }
  },
  //listByteacher
  async list(req, res) {
    try {
      const { userId } = req;
      const adver = await Advertisement.find({dueno: userId});
      res.status(201).json(adver);
    } catch (err) {
      res.status(400).json({ message: "error" });
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
      res.status(200).json({message:"eliminado"});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },


  // async updateComment(req,res){
  //   try{
  //   const { body, params } = req
  //   if (body.comments.length === 0) {
  //     body.comments[0] = 
  //       "escríbenos tu comentario aquí";
  //   }
  //   const comments = await Lesson.findByIdAndUpdate(lessonId, { comments: body.comments }, {new: true,});

//   let updatedLesson;
//   lessons = lessons.map(lesson => {
//     if(lesson._id === params.lessonId) {
//       const comments = [ ...lesson.comments, body.comment]
      

//       updatedLesson = {
//         ...lesson,
//         comments,
        
//       }

//       return updatedLesson
//     }
//     return lesson
//   })

//   res.status(200).json({ message: 'El comentario se actualizó', lesson: updatedlesson , comments })
// } catch (err) {
//   res.status(400).json({ message: err.message });
//   console.log(err.message);
// }
// },
};
