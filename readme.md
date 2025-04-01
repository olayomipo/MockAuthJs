# Node.js Backend API

A comprehensive Node.js backend API featuring JWT-based authentication and integrated Swagger documentation.

## Features

- **User Authentication**: Secure authentication using JWT.
- **Profile Management**: Supports photo uploads, detail updates, and password changes.
- **API Documentation**: Interactive documentation with Swagger.
- **Technologies Used**: Built with Express.js and MongoDB.

## Installation

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**:

   ```sh
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file with the following variables:

   ```env
   PORT=8304
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Server**:

   ```sh
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user.

### Profile Management

- `GET /api/user/profile`: Retrieve user profile.
- `PUT /api/user/profile`: Update user profile.
- `POST /api/user/photo`: Upload a profile photo.
- `PUT /api/user/password`: Change user password.

## Swagger Documentation

Access the API documentation via Swagger at `http://localhost:8304/docs`.

## License

This project is licensed under the MIT License.
