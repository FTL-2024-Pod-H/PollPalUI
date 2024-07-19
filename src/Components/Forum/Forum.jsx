import React, {useState} from "react";
import "./Forum.css"
import Post from "./Post/Post";
import ForumModal from "./ForumModal/ForumModal";
import NotLoggedPrompt from "./NotLoggedPrompt/NotLoggedPrompt";

function Forum(){

    const dummyTimestamp = new Date().toISOString();

    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showLoginPromptModal, setShowLoginPromptModal] = useState(false);
    // const [posts, setPosts] = useState([]);
    // Test with already added (dummy data)


     // logged-in user
     // currentUser would be passed in data to userId

    // const currentUser = "current_user"; //view signed in
    // to test not logged in, change to none
    const currentUser = null; 
    // const currentUser = "alice_id";
    const currentUserUsername = "alice";
    const currentUserFullName = "Alice Smith";
    
    

    const [posts, setPosts] = useState([
        { userFullName: "Alice Smith", username: "alice", userPostContent: "This is Alice's post.", userId: "alice_id" },
        { userFullName: "Bob Johnson", username: "bobj", userPostContent: "This is Bob's post.", userId: "bob_id" },
        { userFullName: "Kiahna Isadore", username: "kisadore", userPostContent: "Hi, My name is Kiahna, who do I vote for!!!", userId: "k_isadore" },
        { userFullName: "Kiahna Isadore", username: "kisadore", userPostContent: "Ughh Im so overwhelmed", userId: "k_isadore" }
    ]);

    const[viewMode, setViewMode] = useState("all");
    console.log("Current view mode: ", viewMode);

    const filteredPosts = viewMode === 'your'
        ? posts.filter(post => post.userId === currentUser)
        : posts;
    
        console.log("Filtered Posts:", filteredPosts);

    // const handleCreatePost = () => {
    //     setShowCreatePostModal(true);
    // };
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

    const handleAddPost = (postContent) => {
        // takes the current users info in order to create post
        const newPost = {
            userFullName: currentUserFullName,
            username: currentUserUsername,
            userPostContent: postContent,
            userId: currentUser
        };
        setPosts([newPost, ...posts]);
    };

    const handleDeletePost = (index) => {
        setPosts(posts.filter((_, postIndex) => postIndex !== index));
    };
    return(
        <>
            <div className="forum-page-container"></div>
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
                {/* <button className="your-posts" onClick={() => setViewMode("your")}>
                    Your Posts
                </button> */}
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
                        userFullName={post.userFullName}
                        username={post.username}
                        userPostContent={post.userPostContent}
                        timestamp={dummyTimestamp}
                        showDelete={post.userId === currentUser}
                        onDelete={()=> handleDeletePost(index)}
                    />
                ))}
            </div>
        </>
    )
};

export default Forum;