/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import joi from 'joi';
import bcrypt from 'bcrypt';
import sendMail from '../helpers/sendEmail';
import models from '../../models';

class AuthController {
  getUsers(req, res) {
    models.User.findAll().then((users) => res.status(200).send({
      success: true,
      message: 'Users successfully retrieved',
      users,
    }));
  }

  createUser(req, res) {
    const data = req.body;
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      first_name: joi.string().required(),
      last_name: joi.string().required(),
      user_name: joi.string().required().min(4).max(10),
      password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/).required(),
    });
    joi.validate(data, schema, (err, value) => {
      const { email, password } = value;
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
        bcrypt.hash(password, 10, (err, hash) => {
          const new_user = { ...value, password: hash, active: false };
          models.User.create(new_user).then((item) => {
            const mailOptions = {
              from: process.env.EMAIL,
              to: email,
              subject: 'Account Verification',
              html: `<p>Please verify your account before you can use it Click <a href='${process.env.HOST}/api/v1/users/activate/${item.id}'>Link<a/></p>`,
            };
            sendMail(mailOptions);
            res.status(201).send({
              success: 'true',
              message: 'User created successfully',
              item,
            });
          }).catch(() => {
            res.status(400).send({
              message: 'Username/email already exists',
            });
          });
        });
      }
    });
  }

  activateAccount(req, res) {
    const { id } = req.params;
    models.User.findOne({ where: { id } }).then((user) => {
      user.update({
        active: true,
      }).then(() => {
        res.status(200).send({
          success: true,
          message: 'The account has been activated. You can successfully login.',
        });
      });
    }).catch(() => {
      res.status(404).send({
        success: false,
        message: 'User does not exist.',
      });
    });
  }
}

const authController = new AuthController();
export default authController;
