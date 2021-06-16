const router = require("express").Router();
let User = require("../models/usermodel");
const bycrpt = require("bcryptjs");
const passport = require("passport");
const JWT = require("jsonwebtoken");
const JWT_SECRET = require("../config").JWT_SECRET;
const config = require("config");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dkep6n2mk",
  api_key: "822133848497339",
  api_secret: "-ej2WW3P7rWZtSYBZ3npmvQ9fKw",
});
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

/**************GET USERS*************/
router.route("/").get(auth, (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

/*******Register*********/ /*********Token expire in 1 hour******** */
router.route("/register").post(
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("phoneNumber", "phone number is required").isLength({
      min: 8,
    }),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const birthDate = req.body.birthDate;
    const adress = req.body.adress;
    const phoneNumber = req.body.phoneNumber;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        email,
        password,
        firstName,
        lastName,
        birthDate,

        adress,
        phoneNumber,
        avatar,
      });
      bycrpt.genSalt(10, (err, salt) =>
        bycrpt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          const payload = {
            user: {
              id: user.id,
            },
          };
          const token = JWT.sign(payload, config.get("jwtSecret"), {
            expiresIn: 3600,
          });
           
          user
            .save()
            .then(() =>
            
              res.json({ user, msg: "Registraion successful", token })
            )
            .catch((err) => res.status(400).json(err));
        })
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
router.get("/userid/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/test", (req, res, next) => {
  const body = req.body;
  try {
    console.log(body);
  } catch (error) {
    next(error);
  }
});

/*router.put('/Userquizz/:id/:quizzid', (req, res) => {
    
    User.findById(req.params.id)
    .then(user => {
        user.quizzexist =true
             
        Quizzz.findById(req.params.quizzid)
        .then(kk => {
        user.Quizzs.push(kk._id)
        user.save()
        
    })
        .then(() => res.json('quizz updated!'+user))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    })*/

//Login handle  /*********Token expire in 1 hour******** */
router
  .route("/login")
  .post(
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Password is required").exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email,
        });
        if (!user) {
          return res.status(400).json({
            errors: [
              {
                msg: "Invalid credentials",
              },
            ],
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({
            errors: [
              {
                msg: "Invalid credentials",
              },
            ],
          });
        }
        const payload = {
          user: {
            id: user.id,
          },
        };

        const token = JWT.sign(payload, config.get("jwtSecret"), {
          expiresIn: 3600,
        });
        // res.cookie('access_token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
        return res.json({ user, token });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );
//edit account
router.route("/update").post(
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("phoneNumber", "phone number is required").isLength({
      min: 8,
    }),
    check("email", "Please enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {
      
      email,
      //   password,
      firstName,
      lastName,
      birthDate,
        adress, 
      phoneNumber,
    } = req.body;
    //build profile object
    const profileFields = {};
    // profileFields = req._id
    if (email) profileFields.email = email;
    // if (password) profileFields.password = password;
    if (lastName) profileFields.firstName = firstName;
    if (lastName) profileFields.lastName = lastName;
    //if (borndate) profileFields.borndate = borndate;
    if (adress) profileFields.adress = adress;
    if (phoneNumber) profileFields.phoneNumber = phoneNumber;
    
    try {
      // See if user exists
      let user = await User.findOne({email});
      
      if (user) {
        user = await User.findOneAndUpdate(
          {email},
          {
            $set: profileFields,
          },
          { new: true }
        );
        console.log(user)
        return res.json(user);
      }
    } catch (err) {
      console.error(err.message + "ddddddd");
      res.status(500).send("Server error");
    }
  }
);
//get current user account
router.route("/me").get(auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(400)
        .json({ msg: "there is no profile for this user " });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//Logout
router.route("/logout").get((req, res) => {
  //res.clearCookie('access_token');
  req.logout();
  res.json("logged out ");
  console.log("Logged out");
});
//edit avatar
router.route("/upload/:id").post(async (req, res) => {
  const upload = multer({ storage }).single("avatar");

  let avatar = req.body;

  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.send(err);
      }

      const path = req.file.path;
      console.log(path);
      cloudinary.uploader.upload(path, async function (err, image) {
        if (err) return res.send(err);
        console.log("file uploaded to Cloudinary");
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details
        avatar = image.url;
        console.log(avatar);
        const profileFields = {};

        if (avatar) profileFields.avatar = avatar;

        // See if user exists
        let user = await User.findOne({ _id: req.params.id });
        console.log(user);
        if (user) {
          user = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: profileFields,
            },
            { new: true }
          );
          return res.json(user);
        }
      });
    });
  } catch (err) {
    console.error(err.message + "ddddddd");
    res.status(500).send("Server error");
  }
});
router.route("/getavatar/:id").get(async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });
  res.json(user.avatar);
});
router.get("/userid/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});


router.post('/change-password',async(req,res)=>{
  const {token,password,newPassword} = req.body ; 
  try {
    const decodedUser = JWT.verify(token, config.get("jwtSecret") ) ; 
    const user = await User.findById(decodedUser.user.id) ;
    
    const isMatch = await bcrypt.compare(password, user.password); 
    if(!isMatch)
    {
      throw new Error("You entered a wrong password")
    }
    else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newPassword, salt, async function(err, hash) {
            // Store hash in your password DB.
            console.log(newPassword,hash); 
            
            const result = await User.findByIdAndUpdate(decodedUser.user.id,{$set:{password:hash}},{new:true});
            // const result = await User.findById(decodedUser.user.id); 
            console.log(result);  
        });
    });
    }
    res.status(200).json({
      success:true, 
      message:"Password updated successfully "
    })
  }
  catch(err)
  {
    res.status(400).json({
      success: true, 
      message: err.message,
      
    })
      
     

  }
   
})

module.exports = router;
