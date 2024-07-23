// ChatBot.jsx
import React, { useState, useEffect } from 'react';
import './ChatBot.css';
import chatbotIcon from '/assets/icons8-chatbot-24.png';
import useIcon from '/assets/icons8-user-30.png';

const emojiApi = import.meta.env.VITE_EMOJI_API_KEY;

const ChatBot = () => {
    const [messages, setMessages] = useState([{ text: 'Hi, how can I help you?', from: 'bot' }]);
    const [message, setMessage] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [emojis, setEmojis] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showChatBot, setShowChatBot] = useState(false);

    useEffect(() => {
        if (showEmojiPicker) {
            fetchEmojis();
        }
    }, [showEmojiPicker]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         const floatingButton = document.querySelector('.floating-button');
    //         if (floatingButton) {
    //             floatingButton.classList.add('visible');
    //         }
    //     }, 3000); 

    //     return () => clearTimeout(timer);
    // }, []);


    const fetchEmojis = async () => {
        try {
            const response = await fetch(`https://emoji-api.com/emojis?access_key=${emojiApi}`);
            const data = await response.json();
            setEmojis(data);
        } catch (error) {
            console.error('Error fetching emojis:', error);
        }
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setMessages([...messages, { text: message, from: 'user' }]);
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleClose = () => {
        setShowChatBot(false);
    };

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleEmojiClick = (emoji) => {
        setMessage(message + emoji.character);
        setShowEmojiPicker(false);
    };

    return (
        <>
            {!showChatBot && (
                <button className="floating-button" onClick={() => setShowChatBot(true)}>
                    <img src={chatbotIcon} alt="Chatbot Icon" />
                    <span>Got questions? I can help 😊</span>
                </button>
            )}

            {showChatBot && (
                <div className={`chatbot-container ${isCollapsed ? 'collapsed' : ''}`}>
                    <div className="chatbot-header">
                        <div className='chatbot-header-content'>
                            <img src="/assets/poll-pal-icon.png" alt="Website Logo" className="chatbot-logo" />
                            <p>Hello, let's chat</p>
                        </div>
                        <div className="button-group">
                            <button onClick={handleCollapse} className="button collapse-button">
                                <div className="icon">
                                    {isCollapsed ? (
                                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z" className="bi bi-x" fillRule="evenodd"></path>
                                            <path d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" fillRule="evenodd"></path>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" fillRule="evenodd"></path>
                                            <path d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" fillRule="evenodd"></path>
                                        </svg>
                                    )}
                                </div>
                            </button>
                            <button onClick={handleClose} className="button chat-close-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {!isCollapsed && (
                        <>
                            <div className="messages-container">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.from}`}>
                                        {msg.text}
                                    </div>
                                ))}
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                                <button className="send-button" onClick={handleSendMessage}>
                                    <div className="svg-wrapper-1">
                                        <div className="svg-wrapper">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="15"
                                                height="15"
                                            >
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                <path
                                                    fill="currentColor"
                                                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    {/* <span>Send</span> */}
                                </button>
                            </div>
                            {showEmojiPicker && (
                                <div className="emoji-picker">
                                    {emojis.map((emoji) => (
                                        <span key={emoji.slug} onClick={() => handleEmojiClick(emoji)}>
                                            {emoji.character}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default ChatBot;
