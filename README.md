## Video Library Platform
   - This repository contains code for a Video Library platform. 
   - Follow these steps to set up the development environment, database (PostgreSql), backend (Node.js and Express.js)

1. Prerequisites
   - Ensure you have Node.js, npm, Git, and a code editor installed.

2. Getting Started
   - create a git repository of Clone  repository to your local machine:
   - //git clone https://github.com/mperwe/media-library

3. Database Setup
   - Install a relational database ( PostgreSQL).
   - Create a new database for the project.
   - Update backend/config/database.js with your database credentials.

4. Backend Setup
   - Navigate to the backend directory:
   - //cd backend
5. Install backend dependencies:
    - prisma/client": "^5.5.2",
    - body-parser": "^1.20.2",
    - cors": "^2.8.5",
    - express": "^4.18.2",
    - joi": "^17.11.0",
    - jsonwebtoken": "^9.0.2"
6. Install, initialise & generate Prisma Schema for the databas model
     - Install Prisma CLI globally:
     - npm install -g @prisma/cli
     - npx prisma generate
7. Use Lucida.
     - A a media platform for creating ERDS
8. Install Postman
     - An essential tool for API development and testing

9. Running the Application
    - Ensure the backend servers are running.
    - Open http://localhost:4100 in your web browser.

10. Contributing
    - Feel free to contribute. Create a new branch, make changes, and submit a pull request.

11. License
    - This is part of my boot camp projects. 


