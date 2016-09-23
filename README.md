cd sites/react/testing-SGrider-adv-RR/authentication-and-server/server && npm run dev
mongod

start server by running from the 'sever' directory
node index.js 

see notes for more server set up info

Server listening on: 3090

get nodemon running with-- npm run dev (see packagejson scripts)

https://docs.mongodb.com/manual/
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

brew update
brew install mongodb

==> Summary
🍺  /usr/local/Cellar/mongodb/3.2.9: 17 files, 244.2M

Run MongoDB section  
mkdir -p /data/db

set permissions for new directory:
sudo chown -R $USER /data/db


run 
mongod


RoboMongo
cmd r to reload

whenever use need to run
mongod

there are directions for having mongodb run as a startup item? referenced in video- may need googling
