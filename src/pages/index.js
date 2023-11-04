import RenderFromTemplateContext from 'next/dist/client/components/render-from-template-context';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {NavBar} from './Navbar.js';

export default function App() {
  const [messages, setMessages] = useState([]);

  // State variable to keep input text
  const [inputText, setInputText] = useState('');
  
  // TODO: make a state variable to keep track of dark or light mode
  const[variable, setVariable] = useState('light');
  // const[dark, setDark]  = useState(False);

  
  const addMessage = (role, message) => {
    const newMessage = { role, message };

    // TODO: add the new messages to the messages state variable
    setMessages((prevMessages ) => {
      return (
        [...prevMessages, newMessage]
      )
    })

    



    
    
  };
  
  const simulateBotResponse = async (userMessage) => {
    // API Options
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: process.env.NEXT_PUBLIC_API_KEY // This is your trial API key
      },
      body: JSON.stringify({
        message: userMessage,
        model: 'command-light',
        chat_history: messages,
        prompt_truncation: 'auto',
        connectors: [{"id":"web-search"}],
        citation_quality: 'accurate',
        documents: [],
        temperature: 0.3
      })
    }

    try {
      // API link: https://api.cohere.ai/v1/chat
      // TODO: Make a request to the API with the options above
      const res = await fetch('https://api.cohere.ai/v1/chat', options);
      const data  = await res.json();
      console.log(data);


      

      // TODO: Add your response to the chat using the addMessage function
    
      addMessage('chatbot', data.text);

    } catch (err) {
      console.error(err)
    }
  }

  const handleUserInput = async () => {
    console.log(inputText);
    const userMessage = inputText.trim();
    if (userMessage) {
      addMessage('user', userMessage);
      setInputText('');
      await simulateBotResponse(userMessage);
    }
  };
  
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight; // bruh scroll to bottom lets go
  }, [messages]);

  // TODO: Make an alert every time the user switches between light and dark mode

  
  
  useEffect(() => {
    // TODO : add a welcome message by sending "hi" to the bot when the page loads

    simulateBotResponse('hi');


  }, [])
  


  return (
  <>
    {/* Navbar */}
    <NavBar />
    
    
    {/* Chat */}
    <div 
      className="chat-container"
      id="chat-container"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-bubble ${message.role === 'user' ? 'user' : 'bot'}`}
        >
          {message.message}
        </div>
      ))}
    </div>

    {/* Input */}
    <div className="input-container">
      {/* Light and Dark Mode Button */}
      <button 
        // TODO: handle user switching between light and dark mode using onClick
        onClick = {() => {
          setDark(!dark);
          // if (variable == 'light'){
          //   setVariable('dark');
          //   setDark(True);
          // } else {
          //   setVariable('light');
          //   setDark(False);
          // }
        }}



      >
        Dark Mode
      </button>
      <input
        type="text"
        value={inputText}
        // TODO: handle user input using onChange
        onChange = {(event) => setInputText(event.target.value)}

        placeholder="Type a message..." 
        // TODO: handle a user pressing enter to send a message



      />
      <button onClick={handleUserInput}>Send</button>


    </div>
  </>
  );
}

