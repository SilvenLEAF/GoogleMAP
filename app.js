// helping modules
const chalk = require('chalk');

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}










// core modules
const express = require('express');
const path = require('path');


const passport = require('passport');
const cookieSession = require('cookie-session');

















// ------------------------------FIRING EXPRESS APP
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, `client/build`)));















// -----------------------------COOKIE AND PASSPORT
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [`orehasaikyounizettainaru`],
}));




app.use(passport.initialize());
app.use(passport.session());






















/* -------------------------------------------------
.                    config
------------------------------------------------- */
require('./config/mongodbConfig');
require('./config/passportConfig');











/* -------------------------------------------------
.                    routes
------------------------------------------------- */
app.use(require('./routes/authRoute'));
app.use('/user', require('./routes/userRoute'));
app.use(require('./routes/resetPasswordRoute'));

/* -------------------------------------------
.            SEND FORGOT FORM PAGE
------------------------------------------- */
app.get('/forgot', (req, res, next)=>{
  try {
    res.sendFile(path.join(__dirname, `client/build/forgot.html`));
  } catch (err) {
    next(err, req, res)
  }
})



// CATCH ALL HANDLER
app.get('*', (req, res, next)=>{
  try {
    res.sendFile(path.join(__dirname, `client/build/index.html`));
  } catch (err) {
    next(err, req, res)
  }
})






// ERRORS HANDLER
app.use((err, req, res, next)=>{
  console.log(chalk.red(err.message));

  console.log(err);
  res.json({ msg: `Server error`, error: err.message })
});



// --------------------end of routes------------------------


















// -----------------------------------------LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${ PORT }`);
});