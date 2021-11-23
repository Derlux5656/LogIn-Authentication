const express = require('express');

const bodyParser = require('body-parser');
const request = require("https");


const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use( "/Public", express.static('Public'));      

app.get("/", (req,res)=>{
 res.render('LogIn_Page')

})

app.post("/", (req,res)=>{
    
})

app.get("/signup", (req,res)=>{
 res.render("SignUp")   
})

app.post("/signup", (req,res)=>{
    // User Inputs
  const email= req.body.SignUpEmail;
  const comfirmedEmail = req.body.ComfirmedEmail;
  const password= req.body.SignUpPassword;

  if(email!= ComfirmedEmail){
      console.log("Email dosen't Match with comfirmed email")
  }else{
    console.log("You have Signed Up successfuly")
   res.redirect("/")
  }


})


app.listen(port, function(){
  console.log(`Example app listening at http://localhost:${port}`);
})

