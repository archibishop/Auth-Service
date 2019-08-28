
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
