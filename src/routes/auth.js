const passport = require("passport");
const { register, login } = require("../controllers/auth");

const router = require("express").Router();

router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/error",
    successRedirect: "/",
  })
);

module.exports = router;
