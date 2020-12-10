const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis"); 
var base64 = require('js-base64').Base64;
const cheerio = require('cheerio');
const { Order } = require('../models');

//client id
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//uncomment for auth code -> token
const oauth2client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	"http://localhost:3000"
);
	
//this is /googlelogin
router.post('/', (req, resp) => {
    // console.log(req.body);
    //exchange auth code for tokens, sent client to checkForMails function
    const {code} = req.body;
    authorize(oauth2client, checkForMails);

    function authorize(oauth2client, callback){
        oauth2client.getToken(code, (res, tokens)=>{
        oauth2client.setCredentials(tokens);
        //console.log("oauth2client here: ", oauth2client);
        //token response
        //console.log("these are the tokens: ", tokens);

        //verify user id_token matched application id_token
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
                    }//else
                })//findone
            }//if(email verified)
        }); //.then
        callback(oauth2client);
        });//get tokens
    }//authorize
});//post
    

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
     const query = 'Order tracking';
     gmail.users.messages.list({
      "userId": 'me',
      "maxResults": 10,
      q: query
    })
    .then( res =>{
        console.log(res.data.messages);
        let mails = res.data.messages;
        //for each message id get the contents
        mails.forEach(message => {
            getMail(message.id, oauth);
        });
        //console.log("this is new response", response.data.messages);
    })
    .catch(err=>{
        console.log("error in response: ", err);
    });
}//checkForMails


//get email metadata and body using email id
function getMail(msgId, oauth){
    const gmail = google.gmail({version: 'v1', auth: oauth});
    //This api call will fetch the mailbody.
        gmail.users.messages.get({
        'userId': 'me',
        'id': msgId
    })
    .then(function(res) {
        console.log("MESSAGE SNIPPET: ", res.data.snippet);
        const link = 'https://mail.google.com/mail/#inbox/' + msgId;
        console.log("LINK TO EMAIL: ", link);
        console.log("FROM: ", res.data.payload.headers.find(x => x.name === 'From').value);
        console.log();

    Order.findOne({where: {link}}).then(order => {
        if(!order){
            Order.create({
                snippet: res.data.snippet,
                link: link,
                from: res.data.payload.headers.find(x => x.name === 'From').value
            })
        }
    })
    
    
    if(res.data.payload.parts != undefined && res.data.payload.parts[0].body.data != ("" || undefined)){
        //base64 encoded email body:
        var body = res.data.payload.parts[0].body.data;
        var htmlBody = base64.decode(body.replace(/-/g, '+').replace(/_/g, '/'));
        //console.log(htmlBody);

        const $ = cheerio.load(htmlBody.toLowerCase());
        let orderNum = $('*:contains("order #"), *:contains("order number"), *:contains("ordernumber")').last();
        //let trackingNum = $('a:contains("tracking"), a:contains("navar.com"), a:contains("trackingnumber")').val();
        
        if($('a[href*=sephora]')){
        //$('a[href*=sephora]').each( (index, value) => {
            var linky = $('a[href*=sephora]').attr('href');
            console.log("this is a link? ", linky); 
        }else{
        if($("a:contains(track)")){
            // //$('a[href*=sephora]').each( (index, value) => {
            //     var matchingElements = $("a:contains(track)");
            //      matchingElements.map(function(index, element) {
            //         console.log( $(element).attr('href'));
            //     //console.log("this is a link? ", linkyy); 
                
             }
        }
        console.log("Order Number 1: " + orderNum.text());
        console.log();
        // console.log("Tracking number: " + trackingNum);
        // console.log("Tracking number .next .text: " + trackingNum.next().text());
        //console.log(msgId);
    }
    // else if(res.data.payload.parts != undefined && res.data.payload.parts[1].body.data){
        

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
