const jwt = require("jsonwebtoken");
const JWT_SECRET= "my$seCreat#toke@En"
const fetchuser = (req, res, next) => {
  // get the user from the jwt token and add id to req abject
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate using a valid token token" });
    //excess dinied
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};
module.exports = fetchuser;

// this is a middleware
// middleware ak function hota jise hm khi chipka ke use kr skte h
// to khass kya h
// *1  middleware takes "request", "responce" or then "next"
// *2  next --> next middleware ko call krta h  (is case mein next get request wala function h  )
// router.post('/getuser',fetchuser,async(req,res)=>{
