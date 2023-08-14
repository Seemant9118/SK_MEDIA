# SKMedia : A Social Media Web Application - By Seemant Kamlapuri

This is a social media web application built using React.js, MongoDB, Node.js, Express.js, JWT, Socket.io, and Bcrypt.

## Features

- User registration and authentication with JWT-based token authentication.
- User profiles with the ability to update profile information and upload profile pictures.
- Post creation, editing, and deletion with real-time updates using Socket.io.
- Ability to like, comment on, and share posts.
- News feed displaying posts from followed users.
- User search functionality.
- Notification system for new likes, comments, and followers.

## Tech Stack

- React.js: A JavaScript library for building user interfaces.
- MongoDB: A popular NoSQL database for storing application data.
- Node.js: A runtime environment for running JavaScript on the server.
- Express.js: A web application framework for Node.js.
- JWT (JSON Web Tokens): A method for securely transmitting information between parties as a JSON object.
- Socket.io: A library that enables real-time, bidirectional and event-based communication between the browser and the server.
- Bcrypt: A library for hashing and encrypting passwords.

## Installation

To run this application on your local machine, make sure you have the following prerequisites installed:

- Node.js (version X.X.X): [Download Node.js](https://nodejs.org/)
- MongoDB (version X.X.X): [Download MongoDB](https://www.mongodb.com/)

Follow these steps to install and run the application:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/social-media-app.git
   ```

2. Navigate to the project directory:

   ```
   cd social-media-app
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables and update their values according to your configuration:

     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/social_media_app
     JWT_SECRET=your_secret_key
     ```

5. Start the application:

   ```
   npm start
   ```

6. Open your browser and visit `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix:
   ```
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit them:
   ```
   git commit -m "Add your commit message"
   ```
4. Push to the branch:
   ```
   git push origin feature/your-feature
   ```
5. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
