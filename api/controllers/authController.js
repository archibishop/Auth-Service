/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import sendMail from '../helpers/sendEmail';
import models from '../../models';
import Dbhelper from '../helpers/dbHelper';

class AuthController {
  getUsers(req, res) {
    models.User.findAll().then((users) => res.status(200).send({
      success: true,
      message: 'Users successfully retrieved',
      users,
    }));
  }

  async createUser(req, res) {
    const {
      email, user_name, first_name, last_name, password,
    } = req.body;

    const new_user = {
      email, user_name, first_name, last_name, password, active: false,
    };
    const user_new = await Dbhelper.createUser(new_user);
    const {
      id, success, user, message,
    } = user_new;
    if (success) {
      sendMail(email, id);
      res.status(201).send({
        success: 'true',
        message,
        user,
      });
    } else {
      res.status(400).send({
        message,
      });
    }
  }


  async activateAccount(req, res) {
    const { id } = req.params;
    const updateRes = await Dbhelper.updateUserActive(id);
    const { update, success, message } = updateRes;
    if (success) {
      if (update[0] === 0) {
        res.status(404).send({
          success: false,
          message: 'User Doesnt exist.',
        });
      } else {
        res.status(200).send({
          success,
          message,
        });
      }
    } else {
      res.status(500).send({
        success,
        message,
      });
    }
  }

  loginUser(req, res) {
    const { user } = req.body;
    const token = jwt.sign({ user }, 'MySuperSecretPassPhrase', { algorithm: 'HS256' });
    res.status(200).send({
      success: true,
      message: 'You have been successfully logged in',
      token,
    });
  }

  async resetPassword(req, res) {
    const { id, password } = req.body;
    const updateResponse = await Dbhelper.updateUserPassword(id, password);
    const { update, success, message } = updateResponse;
    if (success) {
      if (update[0] === 0) {
        res.status(404).send({
          success: false,
          message: 'User Doesnt exist.',
        });
      } else {
        res.status(200).send({
          success,
          message,
        });
      }
    } else {
      res.status(500).send({
        success,
        message,
      });
    }
  }
}

// Add functionality for changing password.

const authController = new AuthController();
export default authController;
