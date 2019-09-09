import jwt from 'jsonwebtoken';
import config from '../helpers/config.json';


const tokenValidator = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: true, message: 'Unauthorized access.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({
      error: true,
      message: 'Token is missing.',
    });
  }
};

export default tokenValidator;
