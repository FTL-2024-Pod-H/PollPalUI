import React, {useState} from "react";
import "./Forum.css"
import Post from "../Post/Post";

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
        setPosts([...posts, newPost]);
    };

    const handleDeletePost = (index) => {
        setPosts(posts.filter((_, postIndex) => postIndex !== index));
    };
    return(
        <>
            <div className="forum-info-section">
                <h1 className="forum-title">Forum</h1>
                <h2 className="forum-description">See what other Poll Pals have to say</h2>
            </div>
            <button class="Btn"
                onlick={handleCreatePost}
            >
                <div class="sign">+</div>
                <div class="text">Create</div>
            </button>

            {showCreatePostModal && (
                <div className="post-form">
                    <CreatePost
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
                <Post />
                <Post />
                <Post />
            </div>
        </>
    )
};

export default Forum;