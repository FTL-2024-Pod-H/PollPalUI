import React, {useState, useEffect} from "react";
import "./Forum.css"
import Post from "./Post/Post";
import ForumModal from "./ForumModal/ForumModal";
import NotLoggedPrompt from "./NotLoggedPrompt/NotLoggedPrompt";
import axios from "axios";

function Forum(){

    // const dummyTimestamp = new Date().toISOString();

    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showLoginPromptModal, setShowLoginPromptModal] = useState(false);
   
    const currentUser = 2; 

    const [posts, setPosts] = useState([ ]);

    const[viewMode, setViewMode] = useState("all");
    console.log("Current view mode: ", viewMode);

    useEffect(() => {
        fetchPosts();
    }, [ viewMode]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/posts");
            console.log("Fetched Posts:", response.data);
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };


    const filteredPosts = viewMode === 'your'
        ? posts.filter(post => post.author_id === currentUser)
        : posts;
    
        console.log("Filtered Posts:", filteredPosts);

 
    const handleCreatePost = () => {
        if (currentUser) {
            setShowCreatePostModal(true);
        } else {
            setShowLoginPromptModal(true);
        }
    };
    const handleCloseCreatePost = () => {
        setShowCreatePostModal(false);
    };

 
    const handleAddPost = async (postContent) => {
        try{
            const newPost = {
                content: postContent,
                author_id: currentUser
            };
            const response = await axios.post("http://localhost:3000/posts", newPost);
            setPosts([response.data, ...posts]);
            setShowCreatePostModal(false);
        }catch (error){
            console.error("Error adding posts:", error)
        }
    };

    const handleDeletePost = (postId) => {
        try{
            axios.delete(`http://localhost:3000/posts/${postId}`);
            setPosts(posts.filter(post => post.post_id !== postId));
        }catch (error){
            console.error("Error deleting post: ", error);
        }
    };
    return(
        <>
            <div className="forum-page-container">
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
                <button className="view-all-posts" onClick={() => setViewMode("all")}>
                    View All Posts
                </button>
                <button className="your-posts" onClick={() => {
                        if (currentUser) {
                            setViewMode("your");
                        } else {
                            setShowLoginPromptModal(true);
                        }
                    }}>
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
            {showLoginPromptModal && (
                <NotLoggedPrompt onClose={() => setShowLoginPromptModal(false)} />
            )}
            <div className="posts-container">
                {filteredPosts.map((post, index) => (
                    <Post
                        key={index}
                        userFullName={post.author.name}
                        username={post.author.username}
                        userPostContent={post.content}
                        timestamp={post.createdAt}
                        showDelete={post.author_id === currentUser}
                        originalLikeCount={post.likes.length}
                        onDelete={()=> handleDeletePost(post.post_id)}
                        postId={post.post_id}
                        currentUser={currentUser}
                    />
                ))}
            </div>
            </div>
        </>
    )
};

export default Forum;