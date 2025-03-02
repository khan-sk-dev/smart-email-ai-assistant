Smart Email Assistant with AI

Overview

Smart Email Assistant is an AI-powered tool that helps users generate professional and context-aware email replies. It consists of three main components:

Backend (Spring Boot): Handles API requests and integrates with Gemini AI for generating email replies.

Frontend (React & Material UI): A user-friendly web interface for inputting email content and selecting tone preferences.

Chrome Extension: Enhances Gmail by adding an AI reply button directly in the compose window.

Features

✅ AI-powered email reply generation
✅ Supports multiple tones (Professional, Casual, Friendly)
✅ Seamless integration with Gmail via a Chrome extension
✅ Simple and clean UI using React & Material UI
✅ Secure backend powered by Spring Boot & WebClient

Tech Stack

Backend:

Java (Spring Boot) – REST API for handling email generation requests

WebClient – To interact with Gemini AI API

Lombok – Reduces boilerplate code

Jackson (ObjectMapper) – JSON processing

Frontend:

React.js – UI Framework

Material UI (MUI) – UI components

Axios – HTTP client for API requests

Chrome Extension:

Manifest V3 – Latest Chrome Extension format

JavaScript (Content Scripts) – Adds AI reply functionality to Gmail

Web Accessible Resources – Enables Gmail UI integration

Installation & Setup

Backend Setup (Spring Boot)

Clone the repository:

git clone https://github.com/yourusername/smart-email-assistant.git
cd smart-email-assistant/backend

Configure API Keys in application.properties:

gemini.api.url=https://api.gemini.com/v1/generate
gemini.api.key=your_api_key_here

Build and run the application:

mvn clean install
mvn spring-boot:run

Frontend Setup (React.js)

Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the React app:

npm start

Chrome Extension Setup

Navigate to the extension directory:

cd ../chrome-extension

Open Chrome and go to chrome://extensions/

Enable Developer Mode (top-right corner)

Click Load Unpacked and select the chrome-extension folder

The extension is now installed and ready to use in Gmail

Usage

Web Interface (React App)

Open the web app and enter the email content

Select the desired tone (Professional, Casual, Friendly)

Click Generate Reply

Copy the AI-generated response to use in your emails

Gmail Extension

Open Gmail and click "Compose"

Click the AI Reply button in the toolbar

The extension fetches the email content and generates a reply

The response is automatically inserted into the compose box

Contributing

Fork the repository

Create a new branch (git checkout -b feature-name)

Commit your changes (git commit -m "Added new feature")

Push to the branch (git push origin feature-name)

Open a Pull Request


Happy coding! 🚀
