import React, { useEffect, useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Course.css';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { grey } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import { authContext } from '../../Components/Context/authContext'; // Import the authContext

const Course2 = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [session_id, setSessionId] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [pendingMessage, setPendingMessage] = useState(null); // Add state for pending message

  const { token } = useContext(authContext); // Use the authContext to get the token

  // Function to fetch historyId and set session_id
  const fetchHistoryId = async (firstMessage) => {
    let data = JSON.stringify({
      "courseId": 2,
      "title": firstMessage // Use the first message as title
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://lltutor.runasp.net/chats',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the token from context
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log("API Response:", response.data);
      const { historyId } = response.data;
      setSessionId(historyId); // Set session_id with historyId
    } catch (error) {
      console.error("Error fetching historyId:", error);
      setError("Failed to fetch historyId. Please try again later.");
    }
  };

  const fetchChatHistory = async () => {
    if (!session_id) return;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://6720-156-210-15-233.ngrok-free.app/chat/SW2/?session_id=${session_id}`,
      headers: { "ngrok-skip-browser-warning": "69423"}
    };

    try {
      const response = await axios.request(config);
      console.log("API Response:", response.data);
      const updatedHistory = response.data.history.map(chat => {
        if (chat.type === 'ai') {
          const contentMatch = chat.content.match(/AIMessage\(content=['"]([\s\S]*?)['"]\)/);
          return { ...chat, content: contentMatch ? contentMatch[1] : chat.content };
        }
        return chat;
      });
      setChatHistory(updatedHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      setError("Failed to fetch chat history. Please try again later.");
    }
  };

  // Function to fetch history list
  const fetchHistoryList = async () => {
    try {
      const response = await axios.get('https://lltutor.runasp.net/chats/2', {
        headers: { 'Authorization': `Bearer ${token}` } // Use the token from context
      });
      console.log("API Response:", response.data);
      setHistoryList(response.data);
    } catch (error) {
      console.error("Error fetching history list:", error);
      setError("Failed to fetch history list. Please try again later.");
    }
  };

  useEffect(() => {
    fetchHistoryList();
    const interval = setInterval(() => {
      fetchHistoryList();
    }, 5000); // Run fetchHistoryList every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (session_id) {
      fetchChatHistory();
    }
  }, [session_id]);

  useEffect(() => {
    if (session_id && pendingMessage) {
      sendMessage(pendingMessage);
      setPendingMessage(null);
    }
  }, [session_id, pendingMessage]);

  useEffect(() => {
    if (session_id) {
      const interval = setInterval(() => {
        fetchChatHistory();
      }, 5000); // Run fetchChatHistory every 5 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount or when session_id changes
    }
  }, [session_id]);

  const handleBack = () => {
    window.history.back();
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    const newMessage = { type: 'human', content: message };
    setChatHistory([...chatHistory, newMessage]);
    setMessage('');

    if (!session_id) {
      setPendingMessage(message); // Set pending message
      await fetchHistoryId(message); // Call fetchHistoryId with the first message as title
      return;
    } 

    sendMessage(message);
  };

  const sendMessage = async (message) => {
    const data = JSON.stringify({
      session_id: session_id.toString(),
      question: message
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://6720-156-210-15-233.ngrok-free.app/chat/SW2/',
      headers: { 
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69424",
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log("API Response:", response.data);

      const aiResponseContent = response.data.reply.match(/AIMessage\(content=['"]([\s\S]*?)['"]\)/)?.[1] || response.data.reply || "No response from AI";
      const aiResponse = { type: 'ai', content: aiResponseContent };
      setChatHistory((prevChatHistory) => [...prevChatHistory, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again later.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setSessionId(null); // Reset session_id
    setChatHistory([]); // Clear chat history
    setMessage(''); // Clear message input
  };

  return (
    <>
      <Navbar />

      <div id='chat-body'>
        {/* head */}
        <div className='head-course-section container-fluid row'>
          <div className='col-1 goBack-chat-btn'>
            <a href="/login">
              <ArrowBackIosRoundedIcon sx={{ fontSize: 30 }} /> Chat
            </a>
          </div>
          <div className='col-2'>
            <button className='new-chat-btn' onClick={handleNewChat}>New Chat</button>
          </div>
        </div>

        {/* Body */}
        <div className='chat__history-container container-fluid row'>
          <div id='history-container' className='col-3'>
            <div className='history'>
              {/* HEAD HISTORY -- search section */}
              <div className='d-flex align-items-center justify-content-center height-1'>
                <div className='search-container'>
                  <SearchRoundedIcon sx={{ color: grey[500] }} />
                  <input type="search" id='inputSearch_history' placeholder='Search' />
                </div>
              </div>

              <hr id='h-line' />

              {/* BODY HISTORY -- list section */}
              <div id='list'>
                <ul className='ul-list'>
                  {historyList.length === 0 ? (
                    <li>No history available</li>
                  ) : (
                    historyList.map((item) => (
                      <li key={item.historyId} onClick={() => setSessionId(item.historyId)}>
                        {item.title}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* CHAT SECTION */}
          <div id='chatAiBody-container' className='col-9'>
            <div className='chatAiBody'>
              {/* TITLE --> CHAT */}
              <div className='chatTitle row'>
                <div className='col-2 fs-3 fw-bolder letter-space-1'>Software Engineering</div>
                <div className='time-date col-2'>
                  {/* <span>10 : 00 AM</span>
                  <span>06 / 07 / 2024</span> */}
                </div>
              </div>

              {/* Chat Body */}
              <div id='chat-container'>
                <ul>
                  {chatHistory.map((chat, index) => (
                    <li key={index} className={chat.type === 'human' ? 'user-msg col-9 mt-3' : 'chat-msg col-9'}>
                      {chat.type === 'ai' && <h5><b>AI Tutor</b></h5>}
                      <ReactMarkdown>{chat.content.replace(/\\n/g, '\n')}</ReactMarkdown>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chat Input */}
              <div id='chat-input-container'>
                <div className='input-chat col-10'>
                  <textarea
                    id='textarea-input'
                    placeholder='Enter Message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  ></textarea>
                  <span id="hidden-text" className="hidden"></span>
                </div>
                <div className='col-2 send-btn-chat-container'>
                  <button className='send-btn-chat' onClick={handleSendMessage}>
                    <span className='me-2'> Send </span> <SendIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Course2;
