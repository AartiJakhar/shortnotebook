const express = require('express');
const User = require( '../modals/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.use(express.json())
const { body, validationResult } = require('express-validator');
const JWT_SECRET= "my$seCreat#toke@En"
const fetchuser = require('../middleware/fetchuser')

// Route : 1 >creat a user using post "/api/auth/createuser" . //no login required
router.post('/creatuser',[
   body('name','enter a valid name').isLength({ min: 3 }),
   body('email',"enter a valid email").isEmail(),
   body('password','enter at list five charactors for security prupose').isLength({ min: 5 }),
],async(req,res)=>{

  let success=false;
   //if there are errors , return bad Request and the errors 
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    //check whether the user with this eail exists alresady
    try {
    let user = await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({error:"sorry a user with this email already exists"});
    }


    const salt =await bcrypt.genSalt(10);
    secPass =await bcrypt.hash(req.body.password,salt)

   //  create a new user 
   user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password:secPass ,//secuired password(hash,salt , papper)
       })

      //   web token 
      //referense--jwt.io,npm
       const data ={
         user:{ 
            id:user.id
       }
       }
       const authtoken = jwt.sign(data, JWT_SECRET); // retern a promise(token)
       success=true;
       console.log(authtoken)
       res.json({success,authtoken})

      //  catch error s 
      } catch (error){
         console.log(error.message);
         res.status(500).send("some Error Occured")
      }
       
   //  res.json(User);
})


// Route : 2 > Authenticate a user using : post "/api/auth/login". NO login required
router.post('/login',[
   body('email',"enter a valid email").isEmail(),
   body('password',"password can't be blank").exists(),
],async(req,res)=>{
    let success =false;
    //if there are errors , return bad Request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please try to login with correc credentials"});
      }

      const passwordCompare =await bcrypt.compare(password, user.password);
      if(!passwordCompare){
      return res.status(400).json({ success,error:"Please try to login with correc credentials"});
      }
      const data ={
         user:{ 
            id:user.id
       }
       }
       const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
       res.json({success,authtoken})
   } catch (error){
      console.log(error.message);
      res.status(500).send("internal server error")
   }
})



//Route : 3 > Get loggedin user Details using : Post "api/auth/getuser".Login required 
router.post('/getuser',fetchuser,async(req,res)=>{
    
    try {
      userId = req.user.id
      const user = await User.findById(userId).select("-password")
      res.send(user)
   } catch (error){
      console.log(error.message);
      res.status(500).send("internal server error")
   }
})

module.exports = router;