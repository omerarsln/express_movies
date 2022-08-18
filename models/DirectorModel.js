const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DirectorSchema = new Schema(
    {
        name: String,
        surname: String,
        bio: {
            type: String,
            default: "Default Biography"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model("directors" , DirectorSchema);