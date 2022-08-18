const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Models
const User = require("../models/UserModel");

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post("/register" , (req,res) => {
  const {username , password} = req.body;

  bcrypt.hash(password , 10).then(hash => {
      const user = new User(
          {
              username : username,
              password : hash
          }
      );
      const promise = user.save();
      promise.then((data) => {
          res.json(data);
      }).catch((err) => {
          res.json(err);
      });
  });
});
router.post("/authenticate" , (req,res) => {
   const {username , password} = req.body;
    User.findOne(
        {

           username : username
       },
       (err,user) => {
           if(err)
               throw err;

           if(!user){
               res.json({status : false , message : "Authenticate Failed : user not found"});
           }
           else{
               bcrypt.compare(password,user.password).then((result) => {
                  if(!result)
                      res.json({status : false , message : "Authenticate Failed : wrong password"});
                  else{
                      const payload = {
                          username : username
                      };
                      const token = jwt.sign(payload, req.app.get("api_secret_key"), {
                          expiresIn : 720 //12 saat
                      });
                      res.json({
                          status : true,
                          token : token
                      })
                  }
               });
           }
       }
   );
});


module.exports = router;
