const router = require("express").Router();
const session = require("express-session");
const { isLoggedIn } = require("../middleware/route-guard");

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.session);
  res.render("index");
});

router.get("/aplication", (req, res, next) => {
  res.render("aplication");
});

module.exports = router;
