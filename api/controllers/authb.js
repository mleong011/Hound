const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis"); //uncomment for authcode-> tokens

//client id
const client = new OAuth2Client(
	"158674415075-1r58o2988bebvq9vjitmgbqtj4udralh.apps.googleusercontent.com"
);

//uncomment for auth code -> token
const oauth2client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	"http://localhost:3000"
);
console.log("clientid: ", process.env.GOOGLE_CLIENT_ID);
console.log('client secret: ', process.env.GOOGLE_CLIENT_SECRET);

	
//this is /googlelogin
router.post('/', (req, resp) => {
    // console.log(req.body);
    //exchange auth code for tokens
    const {code} = req.body;

   
    oauth2client.getToken(code, (res, tokens)=>{
        oauth2client.setCredentials(tokens);
        //token response
        console.log("these are the tokens: ", tokens);

        client.verifyIdToken({
            idToken: tokens.id_token, 
            audience: "158674415075-1r58o2988bebvq9vjitmgbqtj4udralh.apps.googleusercontent.com"
        })
        .then( response => {
        //return object payload
            const {email_verified, name, email} = response.payload;
            console.log("******RESPONSE PAYLOAD*******", response.payload);
            
        
            if(email_verified) {
                //if logged in with email before, use that user, otw create new user:
                User.findOne({where: {email}}).then(user=>{
                        if(user){
                            //user exist in database
                            resp.json(user);
  
                        }else {
                            //does not exist in db
                            User.create({
                                email: email,
                                name: name,
                                accessToken: tokens.access_token,
                                refreshToken: tokens.refresh_token,
                                expiry_date: tokens.expiry_date,
                            }).then( newuser => {
                                resp.status(201).json(newuser);
                                //return(newuser);
                            })
                            .catch(err => {
                                console.log(err);
                                resp.status(400).json(err);
                            });
                        }
                })
            }
            //console.log("i did return ", req);
        }); //.then
    });//get tokens
    //console.log("this is req: ", req);
    

    });
    

//this is /googlelogin?
router.post('/googlelogin', (req, res) => {
    // User.findAll()
    // .then(users => res.json(users));
    console.log(res);
});

module.exports = router;
