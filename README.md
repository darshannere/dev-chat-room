# Dev Chat - WebSocket-Based Real-Time Chat Application

Dev Chat is a real-time chat room application built using WebSockets. It allows users to join the chat with a unique username and interact with others in real-time. The project is developed with Next.js using TypeScript and Tailwind CSS for styling. The UI components are sourced from ShadCN.

## Features
- Real-time messaging with WebSockets
- Dynamic user interface with online user indicators
- Temporary username-based login
- Chat room supports multiple users with smooth message scrolling
- Simple and user-friendly UI with Input, Button, and other ShadCN components
- WebSocket connection to Render-based backend for message and user updates
- Responsive design with Tailwind CSS

## Tech Stack
- **Frontend:** Next.js (TypeScript), Tailwind CSS, ShadCN UI components
- **Backend:** WebSocket server (via Render)
- **WebSocket Library:** Built-in WebSocket in browsers
- **Deployment:** Vercel (optional)

## Installation and Setup

### Prerequisites
Ensure you have Node.js and npm installed on your machine.

### Clone this repository:
```bash
git clone https://github.com/your-username/dev-chat.git
```
### Navigate to the project directory:
```Bash
cd dev-chat-room
```

### Install dependencies:
```Bash
npm install
```

### Start the development server:
```Bash
npm run dev
```
### Open your browser and go to:
http://localhost:3000   


## UI Components

This project uses **ShadCN UI components** for building a modern, minimalist interface:

- **Card**: For user input and messaging sections.
- **Avatar**: Displays user initials or profile image.
- **Input**: Used for username input and message input.
- **Button**: Send button for sending messages.
- **Label**: For labeling input fields.
- **Icons**: Using the `lucide-react` icon library for the "Send" button icon.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Runs the built app in production mode.

## WebSocket Connection

The chat application connects to a WebSocket server hosted on Render. On joining the chat, the user sends their username to the server, and messages are exchanged in real-time. The list of connected users is also updated dynamically.

**WebSocket URLs**:

- **Backend**: `https://backend-web-chat-app.onrender.com/`

## Tailwind CSS

This project uses **Tailwind CSS** for rapid UI development. The class names are utilized for styling components like the message bubble, button, and form elements.

## Example Usage

1. Open the application and enter your username to join the chat.
2. Once connected, send messages to the chat and see others' messages in real-time.
3. View the list of online users on the right panel.

## License

This project is licensed under the **MIT License**. See the LICENSE file for details.

## Author

**Darshan Nere**
