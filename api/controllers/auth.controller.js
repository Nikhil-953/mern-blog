import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Signup function
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !username.trim() ||
    !email.trim() ||
    !password.trim()
  ) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: 'Signup successful' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `Duplicate entry for ${JSON.stringify(error.keyValue)}`,
      });
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Signin function
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ id: validUser._id, isAdmin:validUser.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    const { password: pass, ...rest } = validUser._doc;
    console.log('Generated Token:', token);
    res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: false,        // ❌ true only in production with HTTPS
      sameSite: 'Lax',      // ✅ Allows cross-origin with credentials
      path: '/',            // optional
    })
    .status(200)
    .json({ success: true, user: rest });
  
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Google Sign-in function
export const google = async (req, res, next) => {
  const { name, email, googlePhoto } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      const { password: pass, ...rest } = user._doc;
      res.cookie('access_token', token, {
        httpOnly: false,  // 🔥 TEMPORARY: Allow JavaScript to read the cookie (remove in production)
        secure: false,    // 🔥 `false` on localhost, `true` in production (HTTPS)
        sameSite: 'Lax',  // 🔥 Allows frontend to send cookies
        path: '/',        // 🔥 Ensures cookie is available on all routes
      })
      .status(200)
      .json({ success: true, user });
      
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhoto,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      const { password, ...rest } = newUser._doc;
      return res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
