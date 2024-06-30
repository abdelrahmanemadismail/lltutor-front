import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

const AppContainer = styled.div`
  display: flex;
`;

const App = () => {
  const [activeItem, setActiveItem] = React.useState('software-engineering');
  const [messages, setMessages] = React.useState([
    { text: 'Write summary of software testing', isUser: true },
    { text: 'Of course! Here is a summary of software testing: ...', isUser: false },
  ]);

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, isUser: true }]);
  };

  return (
    <AppContainer>
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <Chat messages={messages} onSendMessage={handleSendMessage} />
    </AppContainer>
  );
};

export default App;