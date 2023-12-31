# Artisan
An application of a craft lists the furniture that the craft makes with the possibility of seeing exactly what materials it used for each creation. He gives a name for each piece of furniture he designs.\
Sometimes he makes the same piece of furniture several times.\
There is also a chart of the list of materials used.

## About
 
- This repository implements the backend REST API (built in Express + MongoDB).
- A repository for the frontend (React App) can be found here : https://github.com/HaThu6989/nodejs-sujet2-artisan/tree/main/client
 
## Requirements
 
For development, you will need Node.js, a node global package, Mongodb, MySQL installed in your environement.
 
### Node
 
You have to install [nodejs and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). If the installation was successful, you should be able to run the following command.
 
    node --version
    npm --version
 
### Mongodb
 
Run MongoDB with [MongoDB Compass](https://www.mongodb.com/docs/compass/master/install/).\
  In this repo, the port 27017 is used to connect to the database MongoDB. Note that you have to add advanced connection options with authentication in the mongodb.yml file :
  
  mongodb://localhost:27017/artisan
  
 
The server is set on port 5006 : [http://localhost:5006](http://localhost:5006).\
If you want another port, you will change the variable :


## Environments
- Mongodb link : MONGODB_URL (ex : mongodb://localhost:27017/artisan)
- Server side : PORT (ex: 5006)
- Client side : FRONT_END_URL (ex: http://localhost:3000)
 
## Instructions
 
To run in your computer, follow these steps :
 
### Cloning for server and client
 
    git clone https://github.com/HaThu6989/nodejs-sujet2-artisan.git 
    cd server/
 
### Configuration environment variables
 
After downloading the repository there are some things that need to be configured if necessary before you are able to run the app in your local environment .env file
 
### Installing dependencies
 
    npm install
 
This will download and install all the dependencies necessary to run the app correctly.
 
## Running the local server
 
    npm start
 
These commands run NODE_ENV=development nodemon server.js which will initiate a live-updated session on the port selected in the environment variable so that the server can be live updated with any code changes.