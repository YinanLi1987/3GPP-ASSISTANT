/* Chatbot.js */
import React, { useState, useEffect } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import API_KEY from "../settings";

function Chatbot({ sectionContent, crContent }) {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am your 3GPP assistant!",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);

  useEffect(() => {
    if (sectionContent) {
      const sectionMessage = {
        message: `Section content: ${sectionContent.section_content}`,
        sender: "system",
        direction: "incoming",
      };
      setMessages((prevMessages) => [...prevMessages, sectionMessage]);
    }

    if (crContent.length > 0) {
      const crMessages = crContent.map((cr) => ({
        message: `CR ${cr.cr_number}: ${cr.cr_title}`,
        sender: "system",
        direction: "incoming",
      }));
      setMessages((prevMessages) => [...prevMessages, ...crMessages]);
    }
  }, [sectionContent, crContent]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage]; // all the old messages + the new message

    // Update our messages state
    setMessages(newMessages);

    // Set a typing indicator (ChatGPT is typing)
    setTyping(true);

    // Process message to ChatGPT (send it over and see the response)
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Role: "user" -> a message from the user, "assistant" -> a response from ChatGPT, "system" -> generally one initial message defining HOW we want ChatGPT to talk
    const systemMessage = {
      role: "system",
      content: "You are a 3GPP specialized assistant.",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => data.json())
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}>
            {messages.map((message, i) => (
              <Message key={i} model={message} />
            ))}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default Chatbot;
