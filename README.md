# Family Travel Tracker

Family Travel Tracker is a Node.js application that allows you to keep track of the countries traveled by various family members. You can use this application to store and retrieve travel data for each family member, making it easy to see where everyone has been. This README will guide you through the setup, installation, and usage of the application.

## Features

- Add and view travel records for each family member.
- Store information about the countries visited, including dates and notes.
- Easily update and delete travel records.

## Prerequisites

Before running the application, ensure that you have the following dependencies installed on your system:

- [Node.js](https://nodejs.org/): Make sure you have Node.js installed on your machine.
- [PostgreSQL](https://www.postgresql.org/): You will need PostgreSQL to store the travel data. Ensure you have a PostgreSQL server up and running.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/family-travel-tracker.git

2. Navigate to the project directory:

  ```cd family-travel-tracker```

3. Install the required Node.js packages using npm:

  ```npm install```

Database Configuration
Create a PostgreSQL database for the application.

In the project directory, locate the index.js file and open it.

Find the database configuration section at the top of the file. Update the database credentials to match your PostgreSQL setup:

  ```const pool = new Pool({
        user: 'your_username',
        host: 'your_host',
        database: 'your_database',
        password: 'your_password',
        port: 'your_port',
      });  
  ```


Save the index.js file.

Running the Application
Now that you've completed the installation and database setup, you can run the Family Travel Tracker application.

Start the Node.js application:

  ```npm start```
  
Open your web browser and go to http://localhost:3000 to access the application.

## Usage
You can start using the Family Travel Tracker application by following these steps:

Add family members: Click on the "Add Family Member" button and provide the required details.

Add travel records: For each family member, click on the "Add Travel Record" button, and enter the details of the country, dates, and any notes related to their travel.

View and manage travel records: You can view and edit travel records for each family member by clicking on their name.

Update or delete travel records: From the family member's travel history, you can update or delete any record.

## Contribution
Contributions to this project are welcome! If you would like to enhance the application or fix any issues, please follow these steps:

Fork the repository on GitHub.

  Create a new branch for your changes:

  ```git checkout -b feature/your-feature```
  
Make your changes, test them thoroughly, and ensure your code follows best practices.

  Push your changes to your forked repository:

  ```git push origin feature/your-feature```
  
Create a pull request to the main repository and provide a clear description of your changes.


If you have any questions or encounter issues, feel free to open an issue in the GitHub repository.

Happy tracking your family's adventures! 🌍✈️
