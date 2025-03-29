# growthgear-task


# The Task

The task is to make a lightweight REST API for mimicing an AI querying engine using in memory database (sqlite3), NodeJs and ExpressJs for the logic. 


## How to run this repository

1. Clone this repository using `git clone (link)` command in your terminal or download the ZIP file.
2. Navigate to the root directory of the repo and run the command `npm i` or `npm install` to install all the libraries, dependencies and packages required.
3. Run `npm start` to run your server. Congratulations! You are now running the server! You should see "" in the terminal. You can also check on localhost:5000 to find the message "".

### Run it using Docker

1. run `docker build -t mini-query-engine .` to build the image after cloning the repo

2. run `docker run my-express-app` to run the image.

### Testing the commands

1. To test the commands, run the following requests in a different terminal. Ensure that the server is running. 
-  curl -X POST http://localhost:5000/api/query \
     -H "Authorization: Bearer this_is_secure_enough,right?" \
     -H "Content-Type: application/json" \
     -d '{"question": "What is the total revenue?"}'
-
-

2. If you are using Postman or some other API testing tool, simply use the following instead - 
-
-
-


##

