import React, {useState} from "react";
import "./Replies.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid, faReply } from '@fortawesome/free-solid-svg-icons';

function Replies({onClose, replies, addReply, userAvatar, username, userPostContent, currentlikeCount, isLiked, handleLikeClick, timestamp}){

    const [newReply, setNewReply] = useState("");

    const handleAddReply = (e) => {
        e.preventDefault();
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
                            <button className="forum-like-button" onClick={handleLikeClick}>
                                <FontAwesomeIcon icon={isLiked ? faThumbsUpSolid : faThumbsUpRegular} className="like-icon" />
                                <span className="like-count">{currentlikeCount}</span>
                            </button>
                        </div>
                    </div>
                    {/* <h3>Replies</h3> */}
                    <div className="replies-container">
                        {replies.map((reply, index) => (
                            <div key={index} className="reply-box">
                                {reply}
                            </div>
                        ))}
                    </div>
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

                </div>

            </div>

        </>
    );
};

export default Replies;