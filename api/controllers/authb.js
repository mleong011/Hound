const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis"); //uncomment for authcode-> tokens
//const { authorize } = require("passport");
var base64 = require('js-base64').Base64;
const cheerio = require('cheerio');
const { Order } = require('../models');

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
    authorizec(oauth2client, checkForMails);

    function authorizec(oauth2client, callback){
       

    // async function checkForMails(){
    //     const gmail = google.gmail({version: 'v1', oauth});
    //     var query = 'subject: your order';
    //      const newresponse = await gmail.users.messages.list({
    //       "userId": 'me',
    //       "maxResults": 2,
    //       q: query
    //     });
    //     console.log(newresponse.data.messages);
    //    }
   
    oauth2client.getToken(code, (res, tokens)=>{
        oauth2client.setCredentials(tokens);
        console.log("oauth2client hereee", oauth2client);
       
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
                                console.log("this is an erro", err);
                                resp.status(400).json(err);
                            });
                        }
                })
            }
            //console.log("i did return ", req);
        }); //.then
        callback(oauth2client);

      
        
    
    });//get tokens
    
}
    //console.log("this is req: ", req);
    


    });
    

//this is /googlelogin?
router.post('/googlelogin', (req, res) => {
    // User.findAll()
    // .then(users => res.json(users));
    console.log(res);
});

function checkForMails(oauth){
     console.log("in check for mails");
     console.log("oauth client in check for mails", oauth);
     const gmail = google.gmail({version: 'v1', auth: oauth});
    // google.options({auth: oauth});
    // const gmail = google.gmail('v1');
    //  console.log("gmail :", gmail);
     var query = 'subject: your order number';
    // console.log("res.data is here: ", res);
     gmail.users.messages.list({
      "userId": 'me',
      "maxResults": 10,
      q: query
    })
    .then( res =>{
        console.log(res.data.messages);
        let mails = res.data.messages;
        mails.forEach(message => {
            getMail(message.id, oauth);
        });
        //console.log("this is new response", response.data.messages);
    })
    .catch(err=>{
        console.log("error in response: ", err);
    });
   }

   function getMail(msgId, oauth){
    const gmail = google.gmail({version: 'v1', auth: oauth});
    //This api call will fetch the mailbody.
     gmail.users.messages.get({
        'userId': 'me',
        'id': msgId
    })
    .then(function(res) {
        console.log("MESSAGE SNIPPET: ", res.data.snippet);
        const email = 'https://mail.google.com/mail/#inbox/' + msgId;
        console.log("LINK TO EMAIL: ", email);
        console.log("FROM: ", res.data.payload.headers.find(x => x.name === 'From').value);
        console.log();

        Order.findOne({where: {email}}).then(order => {
            if(!order){
                Order.create({
                    snippet: res.data.snippet,
                    link: email,
                    from: res.data.payload.headers.find(x => x.name === 'From').value
                })
            }
        })
        
    //     if(res.data.payload.parts != undefined && res.data.payload.parts[0].body.data != ""){
    //         // display the result
            
    //          var body = res.data.payload.parts[0].body.data;
    //      var htmlBody = base64.decode(body.replace(/-/g, '+').replace(/_/g, '/'));

    //     console.log(htmlBody);
    //         const $ = cheerio.load(htmlBody.toLowerCase());
    //         let orderNum = $('*:contains("order #"), *:contains("order number"), *:contains("ordernumber")').last();
    //         console.log("Order Number 1: " + orderNum.text());
    //         //console.log(msgId);
    //     }else if(res.data.payload.parts != undefined && res.data.payload.parts[1].body.data){
            

    //          var bodyt = res.data.payload.parts[1].body.data;
    //         var htmlBodyt = base64.decode(bodyt.replace(/-/g, '+').replace(/_/g, '/'));
            

    //     console.log(htmlBodyt);
    //         const $ = cheerio.load(htmlBodyt.toLowerCase());
    //         let orderNum = $('*:contains("order #"), *:contains("order number"), *:contains("ordernumber")').last();
    //         console.log("Order Number 2: " + orderNum.text());
    //         //console.log(msgId);
    //     }
    //     else{

    //          var bodyy = res.data.payload.body.data;
    //          var htmlBodyy = base64.decode(bodyy.replace(/-/g, '+').replace(/_/g, '/'));
    //          //base64.decode
    //         console.log(htmlBodyy.toLowerCase());
    //         const $ = cheerio.load(htmlBodyy.toLowerCase());
    //         let orderNum = $('*:contains("order #"), *:contains("order number"), *:contains("ordernumber")').last();
    //         //let re = /\d+/;
    //         //let texts = orderNum.nextUntil(/\d+/);

    //         console.log("Order Number 3: " + orderNum.text());
    //         //console.log(msgId);
            
        
    //     }
     })
    .catch(function(err) {
        console.log("Error 2 :" + err);
    });
}


module.exports = router;
