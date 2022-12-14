const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
    {
        title : {
            type: String,
            required: [true , "{PATH} alanı zorunludur"],
            maxlength : 15,
            minlength : 2
        },
        category : String,
        country : String,
        year : Number,
        imdb_score : Number,
        director : String,
        director_id : Schema.Types.ObjectID,
        createdAt : {
            type: Date,
            default: Date.now()
        }
    }
);

module.exports = mongoose.model("movies" , MovieSchema);