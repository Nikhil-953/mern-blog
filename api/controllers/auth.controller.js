import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';


export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password || 
    !username.trim() || !email.trim() || !password.trim() || 
    username.length === 0 || email.length === 0 || password.length === 0) {
    return res.status(400).json({message: 'All fields are required'});
  }

  const hashedPassword = bcryptjs.hashSync(password,10);

  const newUser = new User({
    username, 
    email, 
    password: hashedPassword,
   });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    res.status(409).json({message: error.message});
  }

   
};