/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import sendMail from '../helpers/sendEmail';
import models from '../../models';
import redisClient from '../helpers/redisClient';
import config from '../helpers/config.json';
import repository from '../repository/repository';

// TODO ::
// Change the storage of the tokens to redis
const tokenList = [];

class AuthController {
  getUsers(req, res) {
    // key to store results in Redis store
    const usersRedisKey = 'user:photos';
    let users;
    redisClient.get(usersRedisKey, (err, usersList) => {
      if (usersList) {
        users = JSON.parse(usersList);
      } else {
        models.User.findAll().then((items) => {
          // Save the  API response in Redis store
          redisClient.setex(usersRedisKey, 3600, JSON.stringify(items));
          users = items;
        });
      }
      res.status(200).send({
        success: true,
        message: 'Users successfully retrieved',
        users,
      });
    });
  }

  async createUser(req, res) {
    const {
      email, user_name, first_name, last_name, password,
    } = req.body;

    const new_user = {
      email, user_name, first_name, last_name, password, active: false,
    };
    let user_new;
    try {
      user_new = await repository.createUserRepo(new_user);
    } catch (err) {
      user_new = err
    }
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
    let updateRes;
    try {
      updateRes = await repository.updateUserActiveRepo(id)
    } catch (err) {
      updateRes = err;
    }
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
    const token = jwt.sign({ user }, config.secret, { expiresIn: config.tokenLife });
    const refreshToken = jwt.sign({ user }, config.secret, { expiresIn: config.refreshTokenLife });
    const response = {
      success: true,
      message: 'You have been successfully logged in',
      token,
      refreshToken,
    };
    tokenList.push(refreshToken);
    res.status(200).send(response);
  }

  async resetPassword(req, res) {
    const { id, password } = req.body;
    let updateResponse;
    try {
      updateResponse = await repository.updateUserPasswordRepo(id, password);
    } catch (err) {
      updateResponse = err;
    }
    const { update, success, message } = updateResponse;
    if (success) {
      if (update[0] === 0) {
        res.status(404).send({
          success: false,
          message: 'Password reset failed.',
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

  secureRoutes(req, res) {
    res.status(200).send({
      success: true,
      message: 'Your token has been accepted and you are authenticated.',
    });
  }

  refreshToken(req, res) {
    const { email, name, refreshToken } = req.body;
    if ((refreshToken) && (tokenList.includes(refreshToken))) {
      jwt.verify(refreshToken, config.secret, (err, decoded) => {
        if (err) {
          // TODO ::
          // Remove the expired token from storage..
          res.status(400).json({ error: true, message: "Refesh Token has Expired." });
        } else {
          const { email, name } = decoded.user
          const user = {
            email,
            name
          }
          const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife });
          const response = {
            token,
          };
          res.status(200).json(response);
        }
      });
    } else {
      res.status(400).send({
        success: false,
        message: 'Invalid Refresh Token.',
      });
    }
  }
}

// Add functionality for changing password.

const authController = new AuthController();
export default authController;
