# Smart Email Assistant

A comprehensive AI-powered email assistant that helps users generate professional email replies using Google's Gemini API. The project consists of three main components: a Spring Boot backend, a React frontend, and a Chrome extension.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Chrome Extension Setup](#chrome-extension-setup)
- [Usage](#usage)
  - [Web Application](#web-application)
  - [Chrome Extension](#chrome-extension)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **AI-Powered Email Generation**: Uses Google's Gemini API to generate professional email replies
- **Tone Selection**: Choose from different tones (Professional, Casual, Friendly, Formal) for email replies
- **Web Interface**: Clean React-based web application for generating email replies
- **Chrome Extension**: Directly generate email replies within Gmail interface
- **Copy to Clipboard**: Easily copy generated emails to clipboard

## Architecture

The project follows a client-server architecture:

1. **Backend**: Spring Boot application that serves as the API layer, communicating with Google's Gemini API
2. **Frontend**: React web application providing a user-friendly interface for email generation
3. **Chrome Extension**: Browser extension that integrates directly with Gmail's compose window

## Project Structure

```
.
├── Backend/                 # Spring Boot application
│   ├── src/
│   │   ├── main/java/com/email_writer/app/
│   │   │   ├── EmailGeneratorController.java
│   │   │   ├── EmailGeneratorService.java
│   │   │   └── EmailRequest.java
│   │   └── resources/
│   │       └── application.properties
│   └── pom.xml
├── Frontend/                # React web application
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── chrome-extension/        # Chrome extension
    ├── content.js
    └── manifest.json
```

## Prerequisites

- Java 21+
- Maven 3.8+
- Node.js 16+
- npm 8+
- Google Gemini API Key

## Setup and Installation

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Set up environment variables:
   Create a [.env](file:///c%3A/Users/windows/OneDrive/Desktop/push/Backend/.env) file in the Backend directory or set system environment variables:
   ```bash
   GEMINI_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=
   GEMINI_KEY=your_gemini_api_key_here
   ```

3. Build the project:
   ```bash
   ./mvnw clean install
   ```

4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   
   The backend will start on port 8080.

### Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   
   The frontend will start on port 5173.

### Chrome Extension Setup

1. Open Chrome and navigate to `chrome://extensions/`

2. Enable "Developer mode" in the top right corner

3. Click "Load unpacked" and select the `chrome-extension` directory

4. The extension will be installed and visible in the Chrome toolbar when visiting Gmail

## Usage

### Web Application

1. Start both the backend and frontend servers
2. Open your browser and navigate to `http://localhost:5173`
3. Enter the email content you want to reply to
4. Optionally select a tone for the reply
5. Click "Generate Reply"
6. Copy the generated reply to your clipboard using the "Copy to Clipboard" button

### Chrome Extension

1. Navigate to Gmail and open a conversation
2. Click "Reply" to open the compose window
3. Select the desired tone from the dropdown
4. Click the "AI Reply" button
5. The generated reply will automatically appear in the compose box

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| [/api/email/generate](file:///c%3A/Users/windows/OneDrive/Desktop/push/Backend/src/main/java/com/email_writer/app/EmailGeneratorController.java#L17-L21) | POST | Generates an email reply based on provided content and tone |

**Request Body:**
```json
{
  "emailContent": "string",
  "tone": "string" // Optional: professional, casual, friendly, formal
}
```

**Response:**
```text
Generated email reply as plain text
```

## Environment Variables

### Backend

| Variable | Description | Required |
|----------|-------------|----------|
| GEMINI_URL | Gemini API endpoint URL | Yes |
| GEMINI_KEY | Your Gemini API key | Yes |

## Technologies Used

### Backend
- Java 21
- Spring Boot 3.5.7
- Spring Web
- Spring WebFlux
- Maven

### Frontend
- React 19
- Vite
- Material UI
- Axios

### Chrome Extension
- JavaScript
- Chrome Extension APIs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
