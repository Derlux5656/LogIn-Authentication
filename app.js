const express = require('express');

const bodyParser = require('body-parser');
const request = require("https");


const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use( "/Public", express.static('Public'));      


const mongoose = require('mongoose');
const { render } = require('ejs');
mongoose.connect('mongodb://localhost:27017/LogInAuthentication');

const PersonalData = mongoose.model('userdata', { 
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


const PutYourEmailAgain = [];

app.get("/", (req,res)=>{

 res.render('LogIn_Page');

})

app.post("/", (req,res)=>{

  const Email = req.body.Email;
  const Password = req.body.Password;


  PersonalData.find({email: Email,password: Password}, (err, Items)=>{
    if(err){
      console.log(err)
    } else{
      if(Items.length == 1){
        console.log(Items);
        res.send("You have successfully signed in");
      } else{
        console.log("Error")
      }
    }
  })

    
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
    console.log("Email comfirmed with success");
    const User = new PersonalData({
       email: email,
       password: password 
    })
     User.save();
     
    res.redirect("/");
  } else{

    console.log("Please put your email again");
    if(PutYourEmailAgain.length == 0){
    PutYourEmailAgain.push("Please put your email again");
    }
    res.redirect('/signup')
  }
})

// Data Delete
// PersonalData.deleteOne({password: "taqi"},(err)=>{
//   if(err){
//     console.log(err)
//   } else{
//     console.log("Successfully Deleted");
//   }
// })


app.listen(port, function(){
  console.log(`Example app listening at http://localhost:${port}`);
})

