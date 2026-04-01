import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateUser = (req, res, next) => {
  try {
    console.log('Authorization header:', req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = { id: decoded.id, username: decoded.username, email: decoded.email }; 
    next(); // continue to the next middleware/controller
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};