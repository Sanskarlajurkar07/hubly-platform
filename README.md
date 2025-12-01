Hubly CRM 2.0
=============

Welcome to the Hubly CRM project. This repository contains the backend and frontend applications for the Hubly platform.

🔑 Admin Credentials
--------------------

Email: admin@hubly.com  
Password: Admin@123

  

📂 Project Structure
--------------------

   hubly-crm-backend: The Node.js/Express backend API.
   management-frontend: The React-based admin dashboard for managing tickets and settings.
   hubly-user-frontend: The customer-facing frontend (e.g., landing page, chat widget).

  

🚀 Setup Instructions
---------------------

 1\. Backend (hubly-crm-backend)

Navigate to the backend directory and install dependencies:

    cd hubly-crm-backend
    npm install
    

Start the Server:

   Development Mode:
    
        npm run dev
        
    
   Production Mode:
    
        npm start
        
    

The backend typically runs on port 5000 (check .env).

 2\. Management Frontend (management-frontend)

Navigate to the management frontend directory and install dependencies:

    cd management-frontend
    npm install
    

Start the Development Server:

    npm run dev
    

The management dashboard will be available at the URL provided by Vite (usually http://localhost:5173).

 3\. User Frontend (hubly-user-frontend)

Navigate to the user frontend directory and install dependencies:

    cd hubly-user-frontend
    npm install
    

Start the Development Server:

    npm run dev
    

The user frontend will be available at the URL provided by Vite.

  

⚙️ Environment Variables
------------------------

Ensure you have a .env file in the hubly-crm-backend directory with the necessary configuration (MongoDB URI, JWT Secret, etc.).

Example .env for Backend:

    PORT=5000
    MONGOURI=yourmongodbconnectionstring
    JWTSECRET=yourjwtsecret
    

  

📝 Notes
--------

   Ensure the backend is running before starting the frontends to enable API communication.
   Use the Admin Credentials provided above to log in to the Management Dashboard.
