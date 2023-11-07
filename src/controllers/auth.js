const { hash } = require("bcrypt");

const users = [];

const register = async (req, res, next) => {
  const { name, email, password } = req.body; // Doing no validation

  try {
    const hashedPassword = await hash(password.toString(), 10);

    const user = {
      id: new Date().toISOString(),
      name,
      email,
      password: hashedPassword,
    };
    users.push(user);
    return res.status(201).send(`User created`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  users,
  register,
};
