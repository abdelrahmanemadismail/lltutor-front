import React from 'react';
import styled from 'styled-components';
import Message from './Message';

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ChatHeader = styled.div`
  padding: 20px;
  background: #fff;
  border-bottom: 1px solid #ddd;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const ChatInputContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-top: 1px solid #ddd;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Chat = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = React.useState('');

  const handleSendMessage = () => {
    onSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <ChatContainer>
      <ChatHeader>Chat</ChatHeader>
      <ChatMessages>
        {messages.map((msg, index) => <Message key={index} {...msg} />)}
      </ChatMessages>
      <ChatInputContainer>
        <ChatInput 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
        />
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default Chat;