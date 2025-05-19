# 🚀 Smart Email Assistant with AI

## Overview
Smart Email Assistant is an AI-powered tool that helps users generate professional and context-aware email replies. It consists of three main components:
- Backend (Spring Boot): Handles API requests and integrates with Gemini AI for generating email replies.
- Frontend (React & Material UI): A user-friendly web interface for inputting email content and selecting tone preferences.
- Chrome Extension: Enhances Gmail by adding an AI reply button directly in the compose window.

## Features
✅ AI-powered email reply generation  
✅ Supports multiple tones (Professional, Casual, Friendly)  
✅ Seamless integration with Gmail via a Chrome extension  
✅ Simple and clean UI using React & Material UI  
✅ Secure backend powered by Spring Boot & WebClient  

---

## Tech Stack

### Backend:
- Java (Spring Boot) – REST API for handling email generation requests
- WebClient – To interact with Gemini AI API
- Lombok – Reduces boilerplate code
- Jackson (ObjectMapper) – JSON processing

### Frontend:
- React.js – UI Framework
- Material UI (MUI) – UI components
- Axios – HTTP client for API requests

### Chrome Extension:
- Manifest V3 – Latest Chrome Extension format
- JavaScript (Content Scripts) – Adds AI reply functionality to Gmail
- Web Accessible Resources – Enables Gmail UI integration

---

## Installation & Setup

### Backend Setup (Spring Boot)
1. Clone the repository:
   ```sh
   git clone https://github.com/khan7071/smart-email-assistant.git
   cd smart-email-assistant/backend
   ```
2. Configure API Keys in `application.properties`:
   ```properties
   gemini.api.url=https://api.gemini.com/v1/generate
   gemini.api.key=your_api_key_here
   ```
3. Build and run the application:
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup (React.js)
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

### Chrome Extension Setup
1. Navigate to the extension directory:
   ```sh
   cd ../chrome-extension
   ```
2. Open Chrome and go to `chrome://extensions/`
3. Enable Developer Mode (top-right corner)
4. Click Load Unpacked and select the `chrome-extension` folder
5. The extension is now installed and ready to use in Gmail

---

## Usage

### Web Interface (React App)
1. Open the web app and enter the email content
2. Select the desired tone (Professional, Casual, Friendly)
3. Click Generate Reply
4. Copy the AI-generated response to use in your emails

### Gmail Extension
1. Open Gmail and click "Compose"
2. Click the AI Reply button in the toolbar
3. The extension fetches the email content and generates a reply
4. The response is automatically inserted into the compose box

---

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

Happy coding! 🚀
