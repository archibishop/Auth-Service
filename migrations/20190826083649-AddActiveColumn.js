
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Users',
    'active',
    Sequelize.BOOLEAN,
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'Users',
    'active',
    Sequelize.BOOLEAN,
  ),
};
