# NestJS Backend

This repository contains a backend application built with NestJS. It provides a GraphQL API with file upload functionality and integrates with AWS S3 for storage.

## Features

- **GraphQL API Endpoints**
  - `createAccount`: Create a new user account.
  - `myProfile`: Retrieve the user's profile information.
  - `uploadPicture`: Upload a picture to AWS S3.
  - `getAllMyUploadedPictures`: Retrieve all pictures uploaded by the user.
- **JWT Authentication**: Secure API endpoints with JSON Web Tokens.
- **File Uploads**: Handle file uploads using `graphql-upload` and Apollo Server.
- **MongoDB**: Used as the database for user and picture data.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
 2. Install dependencies:
 ```npm install
3. Set up environment variables by creating a .env file in the root directory with the following content:
```MONGO_URI=<your-mongodb-uri>
AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
AWS_REGION=<your-aws-region>
AWS_BUCKET_NAME=<your-aws-bucket-name>
JWT_SECRET=<your-jwt-secret>

**Running the Application**

Start the application:
1. npm run start
2. Open your browser and navigate to http://localhost:3000/graphql to access the GraphQL Playground.

