import React, {useState} from "react";
import "./Forum.css"
import Post from "../Post/Post";
import ForumModal from "../ForumModal/ForumModal";

function Forum(){

    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [posts, setPosts] = useState([]);

    const handleCreatePost = () => {
        setShowCreatePostModal(true);
    };
    const handleCloseCreatePost = () => {
        setShowCreatePostModal(false);
    };

    const handleAddPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const handleDeletePost = (index) => {
        setPosts(posts.filter((_, postIndex) => postIndex !== index));
    };
    return(
        <>
            <div className="form-title-button">
            <div className="forum-info-section">
                <h1 className="forum-title">Forum</h1>
                <h2 className="forum-description">See what other Poll Pals have to say</h2>
            </div>
            <button className="Btn"
                onClick={handleCreatePost}
            >
                <div className="sign">+</div>
                <div className="text">Create</div>
            </button>
            <div className="switch-posts-buttons-container">
                <button className="view-all-posts">
                    View All Posts
                </button>
                <button className="your-posts">
                    Your Posts
                </button>
            </div>
            </div>

            {showCreatePostModal && (
                <div className="post-form">
                    <ForumModal
                        onClose={handleCloseCreatePost}
                        onAddPost={handleAddPost}
                    />
                </div>
            )}
            <div className="posts-container">
                {posts.map((post, index) => (
                    <Post
                        key={index}
                        userPostContent={post.userPostContent}
                        onDelete={()=> handleDeletePost(index)}
                    />
                ))}
            </div>
        </>
    )
};

export default Forum;