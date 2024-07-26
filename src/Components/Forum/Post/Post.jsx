import "./Post.css";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid, faReply } from '@fortawesome/free-solid-svg-icons';
import NotLoggedPrompt from "../NotLoggedPrompt/NotLoggedPrompt";

function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}



function Post({userFullName, username, userAvatar, userPostContent, onDelete, likeCount, showDelete, timestamp, postId, currentUser, fetchPosts, page, limit}){

    const[currentlikeCount, setCurrentLikeCount] = useState(likeCount);
    const[isLiked, setIsLiked] = useState(false);
    const [showLoginPromptModal, setShowLoginPromptModal] = useState(false);

    
    const fetchLikeStatus = async () => {
        try {
            const response = await axios.get(`https://pollpalapi.onrender.com/posts/${postId}/liked-by/${currentUser}`);
            setIsLiked(response.data.isLiked);
        } catch (error) {
            console.error('Error fetching like status:', error);
        }
    };

    useEffect(() => {
        
        fetchLikeStatus();
    }, [postId, currentUser]);

    const handleLikeClick = async () => {
        if (!currentUser) {
            setShowLoginPromptModal(true);
            return;
        }
        try {
            if (isLiked) {
                await axios.post(`https://pollpalapi.onrender.com/posts/${postId}/unlike`, { user_id: currentUser });
                fetchPosts(page, limit);
            } else {
                await axios.post(`https://pollpalapi.onrender.com/posts/${postId}/like`, { user_id: currentUser });
                fetchPosts(page, limit);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error liking/unliking post:", error);
        }
    };
    
    return (
        <>
            <div className="forum-post">
                
                <div className="forum-post-details">
                    <div className="userinformation">
                        <img
                            // src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                            // alt="Default User"
                            src={userAvatar}
                            alt="User Avatar"
                            className="user-image"
                        />
                        {/* <h2 className="forum-fullname">{userFullName}</h2> */}
                        <h2 className="forum-fullname">@{username}</h2>
                        <div className="forum-username-timestamp">
                            {/* <h3 className="forum-username">@{username}</h3> */}
                            <span className="timestamp">{timeSince(timestamp)}</span>
                        </div>
                    </div>

                    <p className="forum-post-text">{userPostContent}</p>

                    <div className="like-and-delete">
                        <button 
                            className="forum-like-button" 
                            onClick={handleLikeClick}
                        >
                            <FontAwesomeIcon
                               icon={isLiked ? faThumbsUpSolid : faThumbsUpRegular}
                               className="like-icon"
                           />

                            <span className="like-count">{likeCount}</span>
                        </button>
                        {/* REPLY BUTTON */}
                        <div className="group relative">
                            <button className="comment-button">
                                <svg
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                    viewBox="0 0 24 24"
                                    height="44"
                                    width="44"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="comment-icon"
                                    fill="none"
                                >
                                <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                                <path d="M8 9h8"></path>
                                <path d="M8 13h6"></path>
                                <path
                                    d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"
                                ></path>
                                </svg>
                            </button>
                            <span className="tooltip">Replies coming soon</span>
                            {/* <span class="tooltip">Comment</span> */}
                        </div>
                        {showDelete && (
                            <button className="delete-button" onClick={onDelete}>
                                <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="delete-icon">
                                <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {showLoginPromptModal && (
                <NotLoggedPrompt onClose={() => setShowLoginPromptModal(false)} />
            )}
        </>
    )
};
export default Post;