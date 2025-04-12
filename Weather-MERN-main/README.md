# Weather App

This is a MERN (MongoDB, Express.js, React.js, Node.js) project for fetching and displaying weather data based on user input location. The project consists of a frontend implemented in React.js for user interaction and a backend server built with Node.js and Express.js for handling API requests and database operations. MongoDB is used as the database to store weather data.

## Features

- User can input a location to fetch weather data.
- Weather data includes temperature, feels like temperature, humidity, wind speed, cloudiness, visibility, sunrise time, sunset time, and timezone.
- User input location is saved to the database along with whether the data retrieval was successful or not.
- The application automatically updates weather data every minute and displays the latest information.
- Location search history is maintained in the database.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **External APIs**: OpenWeatherMap API, Geocoding API
- **Other Tools**: dotenv for environment variables, cors for handling CORS, fetch API for making HTTP requests

## Project Structure

The project structure is divided into three main parts:

1. **Client**: Contains frontend code implemented in React.js. Includes components for displaying weather data, handling user input, and navigation.
2. **Server**: Contains backend code implemented in Node.js and Express.js. Handles API requests, database operations, and serves the frontend files.
3. **Database**: Contains MongoDB database operations for storing and retrieving weather data.

---

**Author:** [Rupam Dhar](https://github.com/RupamDhar)  
**Date:** April 6, 2024
