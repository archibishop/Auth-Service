echo 'Add Test Env'
export NODE_ENV=test
echo 'Create Database'
sequelize db:create
echo 'Run Migrations'
sequelize db:migrate
echo 'Run Tests'
node_modules/.bin/_mocha --require babel-register tests/*.js --exit
echo 'Drop Database'
sequelize db:drop
export NODE_ENV=development
