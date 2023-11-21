# Chat Application

To clone this repo, you must have Git installed on local machine.


## Installation

There is frontend folder which contains ReactJS code.<br />
To get started with above code, run the following commands,

```
npm i
npm start

```
This will start the local development server on port `3000`. Open `localhost:3000` to preview the dev server.


There is server folder which contains NodeJS code.<br />
To get started with above code, run the following commands,

```
npm i
node index

```

Here index.js is the application startup file.

This will start the local development server on port `8000`. Open `localhost:8000` to preview the dev server.
You will see following result in the browser.

```

Welcome to the ChitChat

```

## Tech Stack

In this project, server code is written in NodeJS and frontend code is written in ReactJS. 



## About 

This application allow user to register or login with their account to access chat rooms.<br /> 
User can join a new rooms or enter in their existing rooms. <br />
User can send messages to all the logged in users in the rooms and can see their online status.



## Routes Details 

This application has following routes. 

1. /signup - POST - To create user account. Full name, email and password are required in body.
2. /signin - POST - To login on the existing account. Email and password are requied in body.
3. /users/{userId}/rooms - GET - To fetch all the joined rooms and unjoined rooms of user. User id should be a valid in path parameter. Authorization token should be contain in headers.



## Additional Information 

This application do not have any database. Application use in-memory data to store users, rooms, room's users and user's rooms.

All users are stored in the users.json file.<br />
All rooms are stored in the rooms.json file.<br />
All room's users are stored in the roomsDetails.json file.<br />
All user's rooms are stored in the userRooms.json file.
