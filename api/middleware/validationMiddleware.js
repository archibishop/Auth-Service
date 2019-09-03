import joi from 'joi';
import bcrypt from 'bcrypt';
import Dbhelper from '../helpers/dbHelper';

const hashPassword = async (value) => {
  const { password } = value;
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const comparePassword = async (password, pass) => {
  const result = await bcrypt.compare(password, pass);
  return result;
};

const validationMiddleWare = (req, res, next) => {
  const { url, body } = req;
  if (url === '/api/v1/users') {
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      first_name: joi.string().required(),
      last_name: joi.string().required(),
      user_name: joi.string().required().min(4).max(10),
      password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/).required(),
    });
    joi.validate(body, schema, async (err, value) => {
      if (err) {
        let message;
        if (err.details[0].path[0] === 'password') {
          message = 'Password must contain uppercase, lowercase letters , a number, a special character and atleast 8 character and maximum of 10 characters.';
        } else {
          message = `${err.details[0].path} field is invalid.`;
        }
        res.status(400).json({
          status: 'error',
          message: `${message}`,
        });
      } else {
        const hashedPass = await hashPassword(value);
        if (hashedPass) {
          req.body.password = hashedPass;
          next();
        } else {
          res.status(400).json({
            success: false,
            message: 'An error Occurred. Please Try Again',
          });
        }
      }
    });
  } else if (url === '/api/v1/users/login') {
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });
    joi.validate(body, schema, async (err, value) => {
      if (err) {
        res.status(400).json({
          status: 'error',
          message: `Invalid request data. (${err.details[0].path}) field is invalid.`,
        });
      } else {
        const userFound = await Dbhelper.findUserByEmail(value.email);
        const { user, success, message } = userFound;
        if (success) {
          const result = await comparePassword(value.password, user.password);
          if (result) {
            req.body.user = user;
            next();
          } else {
            res.status(404).json({
              success: false,
              message: 'Wrong Password Provided',
            });
          }
        } else {
          res.status(404).json({
            success: false,
            message,
          });
        }
      }
    });
  } else if (url === '/api/v1/users/reset-password') {
    const data = req.body;
    const schema = joi.object().keys({
      id: joi.string().required(),
      password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/).required(),
      confirm_password: joi.string().required(),
    });
    joi.validate(data, schema, async (err, value) => {
      const { id, password } = value;
      const confirmPassword = value.confirm_password;
      if (password !== confirmPassword) {
        res.status(400).send({
          success: false,
          message: 'confirm_password and passord should be the same',
        });
      } else {
        const userFound = await Dbhelper.findUserById(id);
        const { user, success, message } = userFound;
        if (success) {
          const result = await comparePassword(password, user.password);
          if (!result) {
            req.body.user = user;
            const hashedPass = await hashPassword(value);
            if (hashedPass) {
              req.body.password = hashedPass;
              next();
            } else {
              res.status(400).json({
                success: false,
                message: 'An error Occurred. Please Try Again',
              });
            }
          } else {
            res.status(400).json({
              success: false,
              message: 'Please enter a new passowrd from the previous one.',
            });
          }
        } else {
          res.status(404).json({
            success: false,
            message,
          });
        }
      }
    });
  }
};


export default validationMiddleWare;
