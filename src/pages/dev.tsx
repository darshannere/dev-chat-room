import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
// import { LoginForm } from './LoginForm';
import { Label } from "@/components/ui/label";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface Message {
  username: string;
  message: string;
}
interface LoginFormProps {
  namePlaceholder?: string;
  emailPlaceholder?: string;
  nameValue?: string;
  emailValue?: string;
  onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
}
function LoginForm({
  namePlaceholder = "Name",
  nameValue = "",
  onNameChange,
  onSubmit,
}: LoginFormProps) {
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 4) {
      setError("Name must be at least 4 characters long.");
    } else {
      setError("");
    }
    
    if (onNameChange) {
      onNameChange(e);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Join Dev Chat!</CardTitle>
        <CardDescription>
          Enter your username below to join the chat.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Username</Label>
          <Input
            id="name"
            placeholder={namePlaceholder}
            value={nameValue}
            onChange={handleNameChange}
            required
          />
          {error && <span className="text-red-500">{error}</span>}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onSubmit} disabled={!!error}>
          Join
        </Button>
      </CardFooter>
    </Card>
  );
}

const Chat: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const fetchConnectedUsers = async () => {
    try {
      const response = await fetch('https://backend-web-chat-app.onrender.com/api/connected-users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setConnectedUsers(data.connectedUsers);
    } catch (error) {
      console.error('Error fetching connected users:', error);
    }
  };

  useEffect(() => {
    fetchConnectedUsers();
    if (connected) {
      const socket = new WebSocket('https://backend-web-chat-app.onrender.com/');
      socket.onopen = () => {
        socket.send(JSON.stringify({ type: 'join', username }));
      };

      socket.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'connected-users') {
            setConnectedUsers(data.connectedUsers);
          } else {
            setMessages((prevMessages) => [...prevMessages, data]);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      socket.onclose = () => {
        setConnected(false);
      };

      setWs(socket);
      return () => socket.close();
    }
  }, [connected, username]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleJoin = () => {
    if (username.trim() !== '') {
      setConnected(true);
    }
  };

  const handleMessageSend = () => {
    fetchConnectedUsers();
    if (input.trim() === '') {
      return; 
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'message', content: input }));
      setInput(''); 
    }
  };

  return (
    <div className='chat-container'>
      {!connected ? (
        <div className="flex h-screen justify-center items-center">
          <div className="w-full max-w-sm">
            <LoginForm
              namePlaceholder="Enter your username"
              nameValue={username}
              onNameChange={(e) => setUsername(e.target.value)}
              onSubmit={handleJoin}
            />
          </div>
        </div>
      ) : (
        <div className="flex h-screen bg-gray-800 text-white">
          <div className="w-64 bg-gray-900 p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-4">DevChat</h2>
            <div style={{ height: '20px' }}></div>

            <p>Welcome to my real-time chat application that is based on websockets.</p>
            <div style={{ height: '720px' }}></div>

            <div className="p-4">
              <p className="text-gray-300 mt-4">Darshan Nere</p>
              <p className="text-gray-300">
                <a href="mailto:darshannere@vt.edu" className="text-gray-300 underline">
                  darshannere@vt.edu
                </a>
              </p>
              <p className="text-gray-300">
                <a href="https://darshannere.com" className="text-gray-300 underline" target="_blank" rel="noopener noreferrer">
                  darshannere.com
                </a>
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => {
                const [msgUsername, msgContent] = msg.message.split(': ');

                if (msg.message.includes('has joined the chat')) {
                  return (
                    <div key={index} className="text-center text-green-500">
                      <p>{msgUsername}</p>
                    </div>
                  );
                }

                if (msg.message.includes('has left the chat')) {
                  return (
                    <div key={index} className="text-center text-red-500">
                      <p>{msgUsername}</p>
                    </div>
                  );
                }
                return (
                  <div key={index} className={`flex items-start ${msgUsername === username ? 'justify-end' : 'justify-start'}`}>
                    {/* Avatar for current user's message */}                    
                    {msgUsername !== username ? (
                      <Avatar className="mr-2">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>{msgUsername.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : <></>}
                    {/* Message Bubble */}
                    <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${msgUsername === username ? 'bg-blue-600' : 'bg-gray-700'} rounded-lg p-3 break-words`}>
                      <p className="font-bold">{msgUsername}</p>
                      <p>{msgContent}</p>
                    </div>
                    {msgUsername === username ? (
                      <Avatar className="ml-2">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>{msgUsername.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : <></>}
                  </div>
                );
              })}
              {/* Reference for scrolling */}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-gray-700 p-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Message #general"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
                  className="flex-1"
                />
                <Button onClick={handleMessageSend} disabled={!connected}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="w-64 bg-gray-900 p-4">
            <h2 className="text-xl font-bold mb-4">Online - {connectedUsers.length}</h2>
            {connectedUsers.map((user) => (
              <div key={user} className="flex items-center mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span>{user}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
