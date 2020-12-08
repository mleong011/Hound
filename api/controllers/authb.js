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
	"http://localhost:3000/auth/google/callback"
);

console.log("clientid: ", process.env.GOOGLE_CLIENT_ID);
console.log("client secret: ", process.env.GOOGLE_CLIENT_SECRET);
console.log("");

// const gmail_client_secret = {
//     "installed": {
//         "client_id": process.env.GOOGLE_CLIENT_ID,
// 		"project_id": process.env.PROJECT_ID,
// 		"auth_uri": process.env.AUTH_URI,
// 		"token_uri": process.env.TOKEN_URI,
// 		"auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
// 		"client_secret": process.env.GOOGLE_CLIENT_SECRET,
// 		"redirect_uris": process.env.REDIRECT_URIS

//     }
// }

const SCOPES = [
	"https://www.googleapis.com/auth/gmail.readonly",
	"https://www.googleapis.com/auth/gmail.modify",
	"https://www.googleapis.com/auth/gmail.compose",
	"https://www.googleapis.com/auth/gmail.send",
];

//this is /googlelogin
router.post("/", (req, res) => {
	// console.log(req.body);
	// const {tokenId} = req.body;
	// client.verifyIdToken({idToken: tokenId.tokenId, audience: "158674415075-1r58o2988bebvq9vjitmgbqtj4udralh.apps.googleusercontent.com"}).then(response => {
	//     //return object payload
	//     const {email_verified, name, email} = response.payload;
	//     console.log("******RESPONSE PAYLOAD*******", response.payload);

	// uncomment exchange auth code for tokens
	const { code } = req.body;
	console.log("THIS IS THE CODE: " + code);
	// const {tokens} = oauth2client.getToken(code, (res, tokens)=>{console.log("these are the tokens: ", tokens)});

	oauth2client.getToken(code, (res, tokens) => {
		console.log("these are the tokens: ", tokens, res);
		oauth2client.setCredentials(tokens);
	});

	//     if(email_verified) {
	//         //if logged in with email before, use that user, otw create new user:
	//         User.findOne({where: {email}}).then((err, user)=>{
	//             if(err){
	//                 return res.status(400).json({
	//                     error: "something went wrong."
	//                 })
	//             } else {
	//                 if(user){
	//                     //user exist in database
	//                      res.json(user);

	//                 }else {
	//                     //does not exist in db
	//                     User.create({
	//                         email: email,
	//                         name: name,
	//                         accessToken: tokenId.accessToken,
	//                     }).then( newuser => {
	//                         res.status(201).json(newuser);
	//                     })
	//                     .catch(err => {
	//                         console.log(err);
	//                         res.status(400).json(err);

	//                     });

	//                 }
	//             }
	//         })
	//     }
	// })
	// console.log()
});

//this is /googlelogin?
router.post("/googlelogin", (req, res) => {
	User.findAll().then((users) => res.json(users));
});

module.exports = router;
