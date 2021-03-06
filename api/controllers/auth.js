const router = require('express').Router();
 const { User } = require('../models');
 const passport = require('../middlewares/authentication');
 const {google} = require('googleapis');
const keys = require('../middlewares/keys');



 router.post('/login', (req, res) => {
  console.log("POST body: ", req.body);
   User.create({
     email: req.body.email,
     name: req.body.name,
     accessToken: req.body.accessToken,
     userId: req.body.userId,
   })
     .then((user) => {
       // req.login(user, () => res.status(201).json(user));
       //res.status(201).json(user)

       const OAuth2 = google.auth.OAuth2;
       const oauth2Client = new OAuth2(keys.google.clientID, keys.google.clientSecret, 'http://localhost:3000/auth/google/callback');
       oauth2Client.setCredentials({ access_token: user.accessToken });
       const gmail = google.gmail({version:'v1', oauth2Client});
       //var query = 'subject: your order';
       // router.get('/', function(req, res, next) {
         //console.log("MESSAGE: ", gmail.users.messages );
         console.log("USER ID: ", "102201229648850837598" );
        //  user.userId
         gmail.users.messages.list({ 
           'userId': "102201229648850837598", 
          //  'maxResults': 2,
           //q: query
           })
           .then((err, res) => {
             
            console.log("DATA", res.data);
             res.send(res.data);

           });
      
     })
     .catch((err) => {
       console.log("ERROR ", err);
       res.status(400).json({ msg: 'Failed Signup', err });
     });
 });



 router.post('/logout', (req, res) => {
   req.logout(); //erases session cookie
   res.status(200).json({ message: 'Logout successful' });
 })

//  router.get('/', passport.isAuthenticated(), (req, res) => {
//    User.find(req.email)
//    .then(user =>{
//        const OAuth2 = google.auth.OAuth2;
//        const oauth2Client = new OAuth2(keys.google.clientID, keys.google.clientSecret, 'http://localhost:3000/auth/google/callback');
//        oauth2Client.setCredentials({ access_token: user.accessToken });
//        const gmail = google.gmail({version:'v1', oauth2Client});
//    gmail.users.messages.list({
//      userId: this.me
//  }, (err, res) => {
//      if(!err){
//          console.log(res.data);
//      }
//      else{
//          console.log("error check inbox: " + err);
//      }
//  })
//  })
//  });


 module.exports = router;