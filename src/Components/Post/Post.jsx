import "./Post.css";
import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';


// DUMMY DATA
// COMMENT OUT AND UNCOMMENT WHEN READY TO PASS INFO
function Post({userFullName, username, userPostContent, onDelete, originalLikeCount}){
    
    const initialLikeCount = 100;
    const[likeCount, setLikeCount] = useState(initialLikeCount);
    // const[likeCount, setLikeCount] = useState(original);
    const[isLiked, setIsLiked] = useState(false);
    
    const handleLikeClick = () => {
        if(isLiked){
            setLikeCount(likeCount - 1);
            setLikeCount(likeCount - 1);
        }
        else{
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
        
    }
    
    return (
        <>
            <div className="forum-post">
                
                <div className="forum-post-details">
                    <div className="userinformation">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                            alt="Default User"
                            className="user-image"
                        />
                        <h2 className="forum-fullname">Full Name</h2>
                        {/* <h2 className="forum-fullname">{userFullName}</h2> */}
                        <h3 className="forum-username">@username</h3>
                        {/* <h3 className="forum-username">@{username}</h3> */}
                    </div>
                    {/* <p className="forum-post-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, neque, obcaecati laboriosam dolores ratione ullam commodi porro, voluptas earum suscipit esse? Numquam obcaecati veritatis ullam voluptas dolorum quam asperiores iure.</p> */}
                    <p className="forum-post-text">{userPostContent}</p>
                    <div className="like-and-delete">
                        <button 
                            className="forum-like-button" 
                            onClick={handleLikeClick}
                        >
                            <img
                                src="public/assets/like-icon.png"
                                alt="Liked "
                                className="like-icon"
                            />
                            <span className="like-count">{likeCount}</span>
                        </button>
                        <button className="btn" onClick={onDelete}>
                            <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="icon">
                            <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        
        </>
    )
};
export default Post;