# MEAN Stack Bookstore Application

Welcome to the MEAN stack bookstore application! This web application allows users to browse, search, and buy books. The application is built using Angular for the front end and Node.js/Express for the back end, with MongoDB as the database.

## Prerequisites

Before you begin, ensure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Angular CLI](https://angular.io/cli)

## Getting Started

### MongoDB Installation (Windows)

1. **Download MongoDB:**
   - Visit the [MongoDB Download Center](https://www.mongodb.com/try/download/community) on your web browser.
   - Select the "Community Server" tab and choose the version that matches your operating system (e.g., Windows).
   - Click the "Download" button to initiate the download.

2. **Run the Installer:**
   - Locate the downloaded installer file (e.g., `mongodb-installersetup-x.x.x.xxxx.msi`) and double-click on it to run the installer.

3. **Install MongoDB:**
   - Follow the installation wizard instructions:
     - Choose the setup type (Complete or Custom).
     - Leave the default components selected.
     - Choose the installation directory (the default is usually fine).
     - Choose whether to install MongoDB Compass (a graphical user interface for MongoDB - can be skipped).
     - Click "Install" to begin the installation process.

4. **Complete the Installation:**
   - Once the installation is complete, you can leave the "Install MongoDB Compass" checkbox selected if you want to install the MongoDB Compass tool as well(can be skipped).
   - Click "Finish" to complete the installation.

5. **Start MongoDB:**
   - Open a command prompt as an administrator.
   - Navigate to the `bin` directory of your MongoDB installation. This is typically located in the installation directory (e.g., `C:\Program Files\MongoDB\Server\4.4\bin`).
   - Run the following command to start the MongoDB server:
     
     "mongod"
     
     If needed, you can specify a data directory using the `--dbpath` option:
     
     "mongod --dbpath C:\path\to\data\directory"
     

6. **Verify MongoDB is Running:**
   - Open another command prompt as an administrator.
   - Navigate to the `bin` directory of your MongoDB installation.
   - Run the following command to connect to the MongoDB server:
     
     "mongo"
     
     This will open the MongoDB shell, and you should see a prompt.

## Server (Node.js/Express)

1. **Navigate to the `server` directory:**
    "cd server"

2. **Install node dependencies:**
    
    "npm install"
    

3. **Set up your MongoDB database:**
    - Update the MongoDB connection string in `server/config/config.js` if needed.


4. **Seed data in mongodb for creating admin user and populating 10 books:**
    - "npm run seed"


5. **Start the server:**
    
     - "npm start"
    
    The server will run on `http://localhost:3000/`.


6. **Running server side test cases:**
    
    "npm run test"

    - It is recommended to run seeds before this step.

    

## Client (Angular)

1. **Navigate to the `client` directory:**
    
    "cd client"
    

2. **Install dependencies:**
    
    "npm install"
    

3. **Start the Angular development server:**
    
    "ng serve"
    

    The client will be available at `http://localhost:4200/`.

4. **Run frontend test cases :**
    
    "ng test"
    

## Usage

- Open your web browser and visit `http://localhost:4200/` to access the bookstore application.


## License

This project is licensed under the [MIT License](LICENSE).
