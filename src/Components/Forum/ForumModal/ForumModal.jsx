import React, {useState} from "react";
import"./ForumModal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ForumModal({onClose, onAddPost}){
    const [userContent, setUserContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // const newPost = { userPostContent: userContent};
        // console.log("Content: ", userContent)
        onAddPost(userContent);
        // setUserContent("");
        onClose();
    };
    
    return(
        <>
            <div className="forum-modal" onClick={onClose}>
        <div
          className="forum-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* <div className="forum-modal-body"> */}
            <form className="new-card-form" onSubmit={handleSubmit} >
              <div className="post-box">
                <button className="close-post-modal-button" onClick={onClose}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <h1 className="text-center text-slate-200 text-xl font-bold">Add a Post</h1>
                <textarea 
                    placeholder="Your content..." 
                    className="post-content" 
                    rows="5"
                    value={userContent}
                    onChange={(e) => setUserContent(e.target.value)}
                    required>
                </textarea>
                
                <button className="post-button" type="submit">
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
                  <span>Post</span>
                </button>
              </div>
            </form>
        </div>
      </div>
        </>
    )
};

export default ForumModal;