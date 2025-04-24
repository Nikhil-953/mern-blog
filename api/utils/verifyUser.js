import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  console.log('Token in request:', req.cookies.access_token);

  const token = req.cookies.access_token;
  console.log('Token:', token);
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
 
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
     
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};
