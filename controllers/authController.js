const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const user_register_get = (req, res) => {
    res.render('register', { title: 'Create a new user' });
  };

  const user_login_get = (req, res) => {
    res.render('login', { title: 'Login' });
  };

const registerUser = async (req, res) => {
  try {
    const { name, email, password,} = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken" });
    }
    const user = new User({ name, email, password,});
    await user.save();
    res.redirect("/auth/login");
  } catch (error) {
    res.status(500).json({ message: "Registrering feilet: " + error.message });
  }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt:", email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: "Feil innlogging" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log("Incorrect password");
            return res.status(401).json({ message: "Feil innlogging" });
        }
        console.log(process.env.JWT_SECRET);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });

        console.log("Login successful");
        res.redirect("/");
    } catch (error) {
        console.error("Login error:", error);  // <- This will show the actual error in console
        res.status(500).json({ message: "Login error: " + error.message });
    }
};


module.exports = {
    user_register_get,
    registerUser,
    user_login_get,
    loginUser
}