

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Users', ['user_name'], {
    type: 'unique',
    name: 'custom_unique_user_name',
  }).then(() => queryInterface.addConstraint('Users', ['email'], {
    type: 'unique',
    name: 'custom_unique_email',
  })),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Users', ['user_name'], {
    type: 'unique',
    name: 'custom_unique_user_name',
  }).then(() => queryInterface.addConstraint('Users', ['user_name'], {
    type: 'unique',
    name: 'custom_unique_email',
  })),
};
