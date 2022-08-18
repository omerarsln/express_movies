const express = require('express');
const router = express.Router();

//Models
const Movie = require("../models/MovieModel");

router.get("/", (req,res) => {
    Movie.find({} , (err,data) => {
        res.json(data);
    });
});

// TOP10 List
router.get("/top10", (req,res) => {
    const promise = Movie.find({}).limit(10).sort({imdb_score : -1});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
       res.json(err);
    });
});

//Between
router.get("/between/:start_year/:end_year", (req,res) => {
    const {start_year , end_year} = req.params;
    const promise = Movie.find(
        {
            year : {
                $gte : start_year,
                $lte : end_year
            }
        }
    );

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get("/:movie_id", (req,res,next) => {
    const promise = Movie.findById(req.params.movie_id);

    promise.then((data) => {
        if(!data)
            res.json({message : "Film Bulunamadı", code : 1});
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.put("/:movie_id", (req,res,next) => {
    const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new: true});

    promise.then((data) => {
        if(!data)
            res.json({message : "Film Güncellenemedi", code : 2});
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.delete("/:movie_id", (req,res) => {
   const promise = Movie.findByIdAndRemove(req.params.movie_id);

   promise.then((data) => {
       if(!data)
           res.json({message : "Film Silinmedi", code : 3});
       res.json({status : 1 , message : "Film Silindi"});
   }).catch((err) => {
      res.json(err);
   });
});

router.post('/', (req, res, next) =>{

  const {title,category,country,year,imdb_score,director,director_id} = req.body;

  const movie = new Movie(
      {
        title : title,
        category : category,
        country : country,
        year : year,
        imdb_score : imdb_score,
        director : director,
        director_id : director_id
      }
  )
  movie.save((err,data) => {
    if(err)
      res.json(err);
    else
      res.json(data);
  });
});

module.exports = router;
