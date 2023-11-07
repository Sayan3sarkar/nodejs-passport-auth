const { compare } = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;

const init = (passport, getUserByEmail, getUserById) => {
  /**
   * @description Responsible for login, ideally would be present in a controller
   */
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email); // In real app, this will be fetched from DB
    if (!user) {
      console.log("NO USER FOUND");
      return done(null, false, "No User with that email");
    }

    try {
      if (await compare(password, user.password)) {
        return done(null, user);
      } else {
        console.log("INVALID CREDENTIALS");
        return done(null, false, { message: "Invalid password" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // can also add "passwordField" which defaults to "password"
        passwordField: "password",
      },
      authenticateUser
    )
  );

  /**
   * @description states what gets stored in users cookie
   * attaches user.id to req.session.passport.user property = {id: 123}
   */
  passport.serializeUser((user, done) => done(null, user.id));

  /**
   * @description first param should correspond to key passed to done of serializeUser
   * User details is retrieved by that key(id in our case) from DB (in our case local array) and is attached to req.user object
   * So for each request, req.user property has all user details
   */
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
};

module.exports = { init };
