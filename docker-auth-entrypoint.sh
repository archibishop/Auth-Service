#!/bin/bash
echo "starting server."
cd /usr/src/app
echo "Run migrations."
node_modules/.bin/sequelize db:create
node_modules/.bin/sequelize db:migrate
echo "Run the start command."
npm run start

