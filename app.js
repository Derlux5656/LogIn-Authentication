const express = require('express');

const bodyParser = require('body-parser');
const request = require("https");


const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use( "/Public", express.static('Public'));      

let PutYourEmailAgain = [];


app.get("/", (req,res)=>{
 res.render('LogIn_Page')

})

app.post("/", (req,res)=>{
    
})

app.get("/signup", (req,res)=>{
 res.render("SignUp" ,{EmailError: PutYourEmailAgain});

})

app.post("/signup", (req,res)=>{
    // User Inputs
  const email= req.body.SignUpEmail;
  const comfirmedEmail = req.body.ComfirmedEmail;
  const password= req.body.SignUpPassword;

  if(email === comfirmedEmail){
    console.log("Email comfirmed with success")
    res.redirect("/")
  } else{
    console.log("Please put your email again");
    PutYourEmailAgain.push("Your email dosen't match with the confirmed email");
    res.redirect("/signup")
  }

})


app.listen(port, function(){
  console.log(`Example app listening at http://localhost:${port}`);
})

