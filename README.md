# Auth-Service

An authentication service built using Node.js and express.


# Getting Started
1. Clone the project. `git clone https://github.com/archibishop/Auth-Service.git`

2. Run `npm install` to install dependencies.

3. Run the app by running `npm run start`.

4. Run the tests by running `npm run test`.

__API endpoints__

 # Features
__interface__
- User can create an account.
- User can login.
- User can activate account.
- User can reset password.
- Can return a list of the users.

__API endpoints__

| End Point                                           | Verb |Use                                   |
| ----------------------------------------------------|------|--------------------------------------|
|`/api/v1/`                                           |GET   |API prefix                            |
|`/api/v1/users`                                      |GET   |Gets a list of users                  |
|`/api/v1/users`                                      |POST  |Create User account                   |
|`/api/v1/users/activate/:id`                         |GET   |Activate user account                 |
|`/api/v1/users/login`                                |POST  |Login user                            |
|`/api/v1/users/reset-password`                       |POST  |User resets password                  |


# How  the arguments are to be passed in postman
  * Users creates account Endpoint takes the following data.
  ```
  {
    "first_name": "john",
    "last_name": "doe",
    "user_name": "johnd",
    "email": "johnd@gmail.com",
    "password": "password"
  }
  ```
   * Users logins in takes the data as follows.
  ```
  {
    "email":"johnd@gmail.com",
    "password":"password"
  }
  ```

# Built With

__API endpoints__
- Node/Express
- Sequelize(ORM)
- Postgresql

# Authors
Wagubi Brian
