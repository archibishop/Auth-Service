#!/bin/bash
echo "starting server."
echo "Run migrations."
node_modules/.bin/sequelize db:create
node_modules/.bin/sequelize db:migrate
echo "Run the start command."
npm run start

