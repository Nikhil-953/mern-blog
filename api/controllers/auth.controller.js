import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || 
      !username.trim() || !email.trim() || !password.trim()) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: "Signup successful" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `E11000 duplicate key error collection: Duplicate entry for ${JSON.stringify(error.keyValue)}`
      });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email == '' || password == '') {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res.status(200).cookie( 'access_token', token, {
      httpOnly: true}).json(rest);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
