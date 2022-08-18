const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

//Models
const Director = require("../models/DirectorModel")

router.post('/', (req, res, next) => {
    const director = new Director(req.body)
    const promise = director.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    });
});

router.get('/', (req, res, next) => {
    const promise = Director.aggregate(
        [
            {
                $lookup : {
                    from : "movies",
                    localField : "_id",
                    foreignField : "director_id",
                    as : "directors_movies"
                }
            },
            {
                $unwind : {
                    path : "$directors_movies",
                    preserveNullAndEmptyArrays : true
                }
            },
            {
                $group : {
                    _id : {
                        _id: "$_id",
                        name : "$name",
                        surname : "$surname",
                        bio : "$bio"
                    },
                    movies : {
                        $push : "$directors_movies"
                    }
                }
            },
            {
                $project : {
                    _id : "$_id._id",
                    name : "$_id.name",
                    surname : "$_id.surname",
                    movies : "$movies.title"
                }
            }
        ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:director_id', (req, res, next) => {
    const promise = Director.aggregate(
        [
            {
                $match : {
                    "_id" : mongoose.Types.ObjectId(req.params.director_id)
                }
            },
            {
                $lookup : {
                    from : "movies",
                    localField : "_id",
                    foreignField : "director_id",
                    as : "directors_movies"
                }
            },
            {
                $unwind : {
                    path : "$directors_movies",
                    preserveNullAndEmptyArrays : true
                }
            },
            {
                $group : {
                    _id : {
                        _id: "$_id",
                        name : "$name",
                        surname : "$surname",
                        bio : "$bio"
                    },
                    movies : {
                        $push : "$directors_movies"
                    }
                }
            },
            {
                $project : {
                    _id : "$_id._id",
                    name : "$_id.name",
                    surname : "$_id.surname",
                    movies : "$movies.title"
                }
            }
        ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.put("/:director_id", (req,res,next) => {
    const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {new: true});

    promise.then((data) => {
        if(!data)
            res.json({message : "Yönetmen Güncellenemedi", code : 4});
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.delete("/:director_id", (req,res) => {
    const promise = Director.findByIdAndRemove(req.params.director_id);

    promise.then((data) => {
        if(!data)
            res.json({message : "Yönetmen Silinmedi", code : 3});
        res.json({status : 1 , message : "Yönetmen Silindi"});
    }).catch((err) => {
        res.json(err);
    });
});
module.exports = router;
