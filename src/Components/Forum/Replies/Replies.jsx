import React, {useState, useEffect} from "react";
import "./Replies.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid, faReply } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";


function getUserAvatar(username) {
    return `https://ui-avatars.com/api/?name=${username}&background=random`;
}

const timeSince = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    
    const interval = Math.floor(seconds / 31536000); // Seconds in a year
    if (interval > 1) return `${interval} years later`;
    
    const monthInterval = Math.floor(seconds / 2592000); // Seconds in a month
    if (monthInterval > 1) return `${monthInterval} months later`;
    
    const dayInterval = Math.floor(seconds / 86400); // Seconds in a day
    if (dayInterval > 1) return `${dayInterval} days later`;
    
    const hourInterval = Math.floor(seconds / 3600); // Seconds in an hour
    if (hourInterval > 1) return `${hourInterval} hours later`;
    
    const minuteInterval = Math.floor(seconds / 60); // Seconds in a minute
    if (minuteInterval > 1) return `${minuteInterval} minutes later`;
    
    return 'Just now'; // Default case
};


function Replies({onClose, replies, addReply, userAvatar, username, userPostContent, currentlikeCount, isLiked, handleLikeClick, timestamp, currentUser, deleteReply}){

    const [newReply, setNewReply] = useState("");

    const handleAddReply = (e) => {
        e.preventDefault();
        // console.log("Reply: ", newReply)
        if (newReply.trim() !== "") {
            addReply(newReply);
            setNewReply("");
        }
    };

    const formattedTime = new Date(timestamp).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    

    return(
        <>  
            <div className="reply-modal" onClick={onClose}>
                <div className="reply-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-reply-modal-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                    <div className="original-post-details">
                        <div className="userinformation-replies">
                            <img src={userAvatar} alt="User Avatar" className="user-image" />
                            <h2 className="username-replies">@{username}</h2>
                            <div className="forum-username-timestamp">
                            {/* <h3 className="forum-username">@{username}</h3> */}
                            <span className="timestamp">{formattedTime}</span>
                        </div>
                        </div>
                        <p className="original-post-content-reply">{userPostContent}</p>
                    
                        <div className="like-reply">
                            <button className="forum-replies-like-button" onClick={handleLikeClick}>
                                <FontAwesomeIcon icon={isLiked ? faThumbsUpSolid : faThumbsUpRegular} className="like-icon" />
                                <span className="like-count">{currentlikeCount}</span>
                            </button>
                        </div>
                    </div>
                    {/* <h3>Replies</h3> */}
                    <div className="replies-container">
                        {replies.map((reply, index) => (
                            <div key={index} className="reply-post-details">
                            <div className="userinformation-replies">
                                <img src={getUserAvatar(reply.author.username)} alt="Reply Avatar" className="user-image" />
                                <h2 className="username-replies">@{reply.author.username}</h2>
                                <span className="timestamp">{new Date(reply.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} </span>
                                {/* <span className="timestamp">{timeSince(reply.createdAt)}</span> */}
                            </div>
                            <p className="original-post-content-reply">{reply.content}</p>
                            <div className="like-reply-class">
                            {reply.author_id === currentUser && (
                            <button className="delete-reply-button" onClick={() => deleteReply(reply.reply_id)}>
                                <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="delete-reply-icon">
                                <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                                </svg>
                            </button>
                            )}
                        </div>
                        </div>
                        
                        ))}
                        
                    </div>
                    {currentUser ? (
                    <form onSubmit={handleAddReply} className="reply-form">
                        <textarea 
                            placeholder="Your content..." 
                            class="reply-post-content" 
                            rows="5"
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            required>
                        </textarea>
                            
                        <button className="reply-post-button" type="submit">
                            <div className="svg-wrapper-1">
                                <div className="svg-wrapper">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path
                                    fill="currentColor"
                                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                    ></path>
                                </svg>
                                </div>
                            </div>
                            <span>Reply</span>
                            </button>
                        {/* </div> */}
                    </form> 
                    ) : (
                        <div className="login-message">
                            Please <a href="/login" className="sign-up-replies">Sign in</a> to post a reply.
                        </div>
                    )}

                </div>

            </div>

        </>
    );
};

export default Replies;