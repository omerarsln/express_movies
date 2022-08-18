const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

module.exports = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/movie-api" , {useNewUrlParser: true , useUnifiedTopology: true});

    mongoose.connection.on("open" , () => {
        console.log("MongoDB : Connected")
    });
    mongoose.connection.on("error" , (err) => {
        console.log("MongoDB : Error" , err)
    })
};