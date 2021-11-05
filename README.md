# COMP30022 IT PROJECT PCRM
## T74 Group Project Reposity

### Table of Contents
-   [General Info](#general-info)
-   [Team Members](#team-members)
-   [Technologies](#technologies)
-   [Environment](#Environment)
-   [Deployment](#Deployment)
-   [Database Connection](#Database-Connection)
-   [Login Details](#login-details)
-   [Testing](#testing)
-   [Version](#Version)

### General Info

Live Heroku Link for now: https://pcrm-t74.herokuapp.com/

PCRM is a personal customer relationship management system developed as a project for COMP30022 IT Project, designed by Team 074- AEHXZ. The aim of the project is to develop a web app that can help users to manage their relationship more easily.

This Web app contacts two main function: manage contacts and manage meetings. Users can not only store contact details in this web app, but also add in meetings (such as business meetings, dates, parties) and connect them with the contacts they will go with.

PCRM also provides functionalities to help users to control their relationships better. Users can search for contacts and meetings with filters, they can also group contacts/meetings using tags.

### Team Members

| Name        | Roles        |
| ------------- | ------------- |
|Chuyue (Amy) Liu| Back end |
|Emily Zhou| Front end|
|Haiyao Yan| Front end|
|Xintao Chen| Back end|
|Zhengtian Lv| Front end|

### Technologies & Tools used during development

- Heroku
- Github
- Node.js
- Express.js
- React
- Postman

### Environment

PCRM is a web app, therefore it can be used on any operating systems with a browser. However, we mainly developed our user inerface for desktop view, we recommend using a computer to access our website.

### Deployment

This github repository is connect to the live Heroku link, using the script implemented in the package.json file, Heroku will automatically deploy the main branch by running rpm start internally. 

```json
"scripts": {
    "start": "node server.js",
    "build": "cd client && npm install && npm run build"
  }
```

To run the project locally, you have to meet following requirements:

Node:  ^6.14.15

React: ^6.14.15

Express: ^4.17.1

Mongoose: ^5.13.8

More dependencies version please refer to package.json.

Direct into the folder in console, then use the commands:

```bash
npm install //to install node_modules and update package-lock.json
```

this is to initiate and install node_modules based on package.JSON file.

If the node_modules files appear and all softwares are installed successfully, in the terminal:

```bash
npm run start
```

this will connect the backend routs of the project, the project starts listening on localhost:5000, and connection to MongoDB database will be established.

In a new console window, direct in to client folder, after this, in ther console:

```bash
npm install //to install node_modules for front-end

npm build

npm run start
```

this will start the front-end of the project on localhost:3000.

### Database Connection

If you want to access the database, use MongoDB Atlas, Studio 3T or other software and the  connection link as follow: mongodb+srv://AEHXZ:aehxz123456@cluster0.0vlpa.mongodb.net/CRM?retryWrites=true&w=majority

### Login Details

Example account details:

UserId: Nemesis00 

Password: 12345678

You can also register an account using the registration functionality.

### Testing
We ran internal testing each time we finish implementation of one functionality. As for now backend and frontend are developing independently, we mostly rely on postman for testing requests send to back end server. Detailed Testing plan included.

#### Postman Requests Testing

Currently we have tested several post & get request within postman, including loging, register, meeting/contact list prensentation, single meeting/contact presentation, meeting/contact creation.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/14869736-158cac8f-3583-47d0-8f3d-e5d91f891bf0?action=collection%2Ffork&collection-url=entityId%3D14869736-158cac8f-3583-47d0-8f3d-e5d91f891bf0%26entityType%3Dcollection%26workspaceId%3D86ca40fd-f7b6-4c80-98cc-71cc06742218)

### Version

First version released on 5/11/2021.

