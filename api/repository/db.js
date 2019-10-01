/* eslint-disable class-methods-use-this */
import models from '../../models';

class Db {
    async createUser(newUser) {
        try {
            const user = await models.User.create(newUser);
            return { success: true, user, message: 'User created successfully' };
        } catch (err) {
            return { success: false, message: 'Username/email already exists' };
        }
    }

    async updateUserActive(id) {
        try {
            const update = await models.User.update(
                { active: true },
                { where: { id } },
            );
            return { success: true, update, message: 'The account has been activated. You can successfully login.' };
        } catch (err) {
            return { success: false, message: 'An error occured.' };
        }
    }

    async updateUserPassword(id, password) {
        try {
            const update = await models.User.update(
                { password },
                { where: { id } },
            );
            return { success: true, update, message: 'Your password has been reset.' };
        } catch (err) {
            return { success: false, message: 'An error occured.' };
        }
    }

    async findUserByEmail(email) {
        try {
            const user = await models.User.findOne({ where: { email } });
            if (user) {
                return { success: true, user };
            }
            return { success: false, message: 'User Email Doesnt Exist.' };
        } catch (err) {
            return { success: false, message: 'An error occured.' };
        }
    }

    async findUserById(id) {
        try {
            const user = await models.User.findOne({ where: { id } });
            if (user) {
                return { success: true, user };
            }
            return { success: false, message: 'User Doesnt Exist.' };
        } catch (err) {
            return { success: false, message: 'An error occured.' };
        }
    }
}

export default new Db();
