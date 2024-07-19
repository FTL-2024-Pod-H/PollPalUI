import React, {useState} from "react";
import"./ForumModal.css"

function ForumModal({onClose, onAddPost}){
    const [userContent, setUserContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // const newPost = { userPostContent: userContent};
        console.log("Content: ", userContent)
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
              <div class="post-box">
                <h1 class="text-center text-slate-200 text-xl font-bold">Add a Post</h1>
                <textarea 
                    placeholder="Your content..." 
                    class="post-content" 
                    rows="5"
                    value={userContent}
                    onChange={(e) => setUserContent(e.target.value)}
                    required>
                </textarea>
                <button class="post-button">
                  <span>Post</span>
                </button>
                  {/* <svg fill="none" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"></path>
                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M10.11 13.6501L13.69 10.0601"></path>
                  </svg> */}
              </div>
              {/* <button className="submit" type="submit">
                Add Post
              </button> */}
            </form>
          {/* </div> */}
        </div>
      </div>
        </>
    )
};

export default ForumModal;