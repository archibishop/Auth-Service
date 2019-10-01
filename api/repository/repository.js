import db from './db';

const repository = () => {
    const createUserRepo = async (user) => {
        return new Promise( async (resolve, reject) => {
            try {
                const response = await db.createUser(user)
                resolve(response)
            } catch (err) {
                resolve(err)
            }
        });
    }

    const updateUserActiveRepo = (id) => {
        return new Promise( async (resolve, reject) => {
            try {
                const response = await db.updateUserActive(id)
                resolve(response)
            } catch (err) {
                resolve(err)
            }
        });
    }

    const updateUserPasswordRepo = (id, password) => {
        return new Promise( async (resolve, reject) => {
            try {
                const response = await db.updateUserPassword(id, password)
                resolve(response)
            } catch (err) {
                resolve(err)
            }
        });
    }

    const findUserByEmailRepo = (email) => {
        return new Promise( async (resolve, reject) => {
            try {
                const response = await db.findUserByEmail(email);
                resolve(response);
            } catch (err) {
                resolve(err);
            }
        });
    }

    const findUserByIdRepo = (id) => {
        return new Promise( async (resolve, reject) => {
            try {
                const response = await db.findUserById(id)
                resolve(response)
            } catch (err) {
                resolve(err)
            }
        });
    }

    return Object.create({
        findUserByEmailRepo,
        findUserByIdRepo,
        createUserRepo,
        updateUserPasswordRepo
    });
}

export default repository();

