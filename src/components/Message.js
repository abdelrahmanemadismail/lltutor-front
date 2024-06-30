import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background: ${props => props.isUser ? '#e6f7ff' : '#fff'};
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Message = ({ text, isUser }) => {
  return (
    <MessageContainer isUser={isUser}>
      {text}
    </MessageContainer>
  );
};

export default Message;
