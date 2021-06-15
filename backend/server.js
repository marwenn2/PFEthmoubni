const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const usersRouter = require('./routes/users');
const forgotpassword = require('./configuration/forgotpassword');
const googleauth = require('./routes/googleauth');
const app = express();


const AnnonceRouter = require('./routes/Annonceroutes');
const Commentaire = require('./routes/Commentaireroutes');

require('dotenv').config();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri || "mongodb+srv://admin:admin@cluster0.3psk5.mongodb.net/SELIMPFE?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('***database works!!***');
})

app.use(express.json({ extended: false }));
//express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('succes_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  }
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT} `);
  })
  
app.use('/annonce', AnnonceRouter);
app.use('/users', usersRouter);
app.use('/forgot', forgotpassword);
app.use('/commentaire',Commentaire)
app.use('/api/auth', require('./routes/auth'));