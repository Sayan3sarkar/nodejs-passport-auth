const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { init } = require("./config/passport");
const { users } = require("./controllers/auth");
const session = require("express-session");
const config = require("./config");

const authRoutes = require("./routes/auth");

const app = express();
init(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  return res.status(200).send(`Welcome ${req.user.name}`);
});
app.use("/auth", authRoutes);

app.get("/error", (req, res) => {
  return res.sendStatus(500);
});

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).send(err.message);
  } else {
    next();
  }
});

// req.isAuthenticated - checks if current user is authenticated or not, to be used in middleware
// req.logout - to logout current user

module.exports = app;
