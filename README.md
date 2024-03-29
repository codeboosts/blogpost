
# Blogpost (blog api)


<a href="https://nodejs.org/" target="_blank"><img src="https://res.cloudinary.com/djvfnekle/image/upload/v1710009760/f05i1vkplc2j3ft5hxoj.png" width="100"  alt="Nestjs Image" /></a>
<a href="https://www.mongodb.com/" target="_blank"><img src="https://res.cloudinary.com/djvfnekle/image/upload/v1710009753/clo5kbdsb1mlfczslpn7.png" width="100"  alt="MongoDb image" /></a>
<a href="https://www.docker.com/" target="_blank"><img src="https://res.cloudinary.com/djvfnekle/image/upload/v1710009749/pebtirzmkqmputt8o0pf.png" width="100"  alt="Docker imahe" /></a>
<a href="https://www.typescriptlang.org/" target="_blank"><img src="https://res.cloudinary.com/djvfnekle/image/upload/v1710009761/otj7i99gcvkj6moeok54.png" width="100"  alt="Typescript image" /></a>


## Description

[Quillpad](https://github.com/zeshan-tech/blogpost) is BE blog app which includes User Management | Post CRUD | comments for posts


## Requirements
Before running this project, ensure you have the following requirements:
- <a href="http://nodejs.org" target="_blank">Node.js</a> 18.x.x or later
- <a href="https://www.mongodb.com/" target="_blank">Mongo DB</a>
- <a href="https://yarnpkg.com/" target="_blank">Yarn (pkg manager)</a>



## Installation
You can install dependencies using Yarn, which is preferred for better performance and reliability:
```bash
yarn install
```


## Running the app
```bash
# development
$ yarn run start
# watch mode
$ yarn run start:dev
# build
$ yarn run start:build
# production mode
$ yarn run start:prod
```



## Environment Variables
Ensure you have a `.env` file in the root directory of the project with the following variables:
```dotenv
PORT=8080
SALT_ROUND=''
REDIS_URI=''
DB_URI=''
DB_NAME=''
JWT_SECRET=''
SMTP_EMAIL=''
SMTP_PASS=''
```



## Docker Compose (Optional)
You can also run the project using Docker Compose. Ensure you have Docker installed on your system.
To start the project with Docker Compose, run the following command:
```bash
docker-compose up
```
<b>(Make sure you also install "docker-credential-helper" and "docker-compose")</b>


For more information on installing Docker Compose, refer to the [official installation guide](https://docs.docker.com/compose/install/).


## APIs
User Management
```bash
# Register
 $ *POST* /user/register
# Login
 $ *POST* /user/login
# Email Verification
 $ *POST* /user/verify-email
# My Info
 $ *GET* /user/me
# Send OTP
 $ *POST* /user/send-otp
# Forgot Password
 $ *POST* /user/forgot-password
# Reset Password
 $ *PUT* /user/reset-password
# Delete User
 $ *DELETE* /user
# Change Password
 $ *PUT* /user/change-password
# Update User
 $ *PUT* /user/update
# Change Email
 $ *PUT* /user/change-email
```


Post Management
```bash
# Create post
 $ *POST* /post
# Delete post
 $ *DELETE* /post/:postId
# post get by id
 $ *GET* /post/:postId
# post get by id
 $ *GET* /post/by-user-id/:userId
# Update post
 $ *PUT* /post/:post
# Get all posts
 $ *GET* /post
```


Comment Management
```bash
# Get comments by post id
 $ *GET* /comment/:postId
# Create comment
 $ *POST* /comment
# Get specific comment replies
 $ *GET* /comment/replies/:commentId
# Update comment
 $ *PUT* /comment/:commentId
# Get all comments
 $ *GET* /comment
```



## Author

- Author - [Zeshan Shakil](https://zeshantech.netlify.app)

## License

Quillpad is [MIT licensed](LICENSE).
