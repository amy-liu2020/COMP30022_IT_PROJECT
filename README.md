# COMP30022 IT PROJECT PCRM
## T74 Group Project Reposity

### Table of Contents
-   [Team Members](#team-members)
-   [General Info](#general-info)
-   [Technologies](#technologies)
-   [Mongo DB Connection](#mongo-db-connection)
-   [Postman Requests](#postman-requests)
-   [Login Details](#login-details)
-   [Testing](#testing)
### Team Members
| Name        | Roles        |
| ------------- | ------------- |
|Chuyue (Amy) Liu| Back end|
|Emily Zhou| Front end|
|Haiyao Yan| Front end|
|Xintao Chen| Back end|
|Zhengtian Lv| Front end|
### General Info
Live Heroku Link for now: https://pcrm-t74.herokuapp.com/api/ <br />
PCRM is a personal customer relationship management system developed as a project for COMP30022 IT Project, designed by Team 074- AEHXZ. The aim of the project is to develop a web app that can help users to manage their relationship more easily. 
This Web app contacts two main function: manage contacts and manage meetings. Users can not only store contact details in this web app, but also add in meetings (such as business meetings, dates, parties) and connect them with the contacts they will go with.
PCRM also provides functionalities to help users to control their relationships better. Users can search for contacts and meetings with filters, they can also group contacts/meetings using tags.
### Technologies
- Heroku
- Github
- Node.js
- Express.js
- React
- Postman
### Mongo DB Connection
Mongo DB Connection Link as follow: mongodb+srv://AEHXZ:aehxz123456@cluster0.0vlpa.mongodb.net/CRM?retryWrites=true&w=majority 
### Postman Requests
Currently we have tested several post & get request within postman, including loging, register, meeting/contact list prensentation, single meeting/contact presentation, meeting/contact creation.
<br/>
We will test more requests in future development phase
<br/>
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/14869736-158cac8f-3583-47d0-8f3d-e5d91f891bf0?action=collection%2Ffork&collection-url=entityId%3D14869736-158cac8f-3583-47d0-8f3d-e5d91f891bf0%26entityType%3Dcollection%26workspaceId%3D86ca40fd-f7b6-4c80-98cc-71cc06742218) 

### Login Details
UserId: Nemesis00 Password: 12345678
### Testing
We run internal testing each time we finisl implement one functionality. As for now backend and frontend are developing independently, we mostly rely on postman for testing requests send to back end server. Detailed Testing plan included.