const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcrypt");
const saltRounds = 13;

/* GET home page */

router.get("/", (req, res, next) => {
  res.render("index");
});

// Display signup form
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

// Post signup form
router.post("/signup", async (req, res, next) => {
  try {
    const identifyUser = await User.findOne({ username: req.body.username });
    if (!identifyUser) {
      const salt = bcryptjs.genSaltSync(saltRounds);
      const encryptedPass = bcryptjs.hashSync(req.body.password, salt);

      await User.create({ username: req.body.username, encryptedPass });
      res.redirect("/auth/login");
    } else {
      res.render("auth/signup", {
        errorMessage: "User already exist",
        data: { username: req.body.username },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Display login form
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

// Post login form
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log("here:", user);
    if (!!user) {
      if (bcryptjs.compareSync(req.body.password, user.encryptedPass)) {
        //req.session.user = { username: user.username };
        res.redirect("/aplication");
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password" });
      }
    } else {
      res.render("auth/login", { errorMessage: "Incorrect user" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
