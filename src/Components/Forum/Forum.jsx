import React, {useState, useEffect} from "react";
import "./Forum.css"
import Post from "./Post/Post";
import ForumModal from "./ForumModal/ForumModal";
import NotLoggedPrompt from "./NotLoggedPrompt/NotLoggedPrompt";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


// DECODE TOKEN MANUALY
function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function getUserAvatar(username) {
    // return `https://robohash.org/${username}.png?set=set1`;
    return `https://ui-avatars.com/api/?name=${username}&background=random`;
    // return `https://robohash.org/${username}.png?set=set2`;
    // return `https://api.multiavatar.com/${username}.png`;
}

function Forum(){

    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showLoginPromptModal, setShowLoginPromptModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [posts, setPosts] = useState([ ]);
    const[viewMode, setViewMode] = useState("all");
    console.log("Current view mode: ", viewMode);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const [totalPosts, setTotalPosts] = useState(0);

    const [clickedButton, setClickedButton] = useState(`all`);


    useEffect(() => {
        // CHECK IF LOGGED IN WITH TOKEN
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = decodeJWT(token);
                setCurrentUser(decodedToken.userId);
            } catch (error) {
                console.error("Error decoding token: ", error);
            }
        }

        // fetchPosts();
        fetchPosts(currentPage, postsPerPage);
    }, [ viewMode, currentPage ]);

    // const fetchPosts = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:3000/posts");
    //         console.log("Fetched Posts:", response.data);
    //         setPosts(response.data);
    //     } catch (error) {
    //         console.error("Error fetching posts:", error);
    //     }
    // };
    const fetchPosts = async (page = 1, limit = 10) => {
        try {
            const response = await axios.get(`http://localhost:3000/posts?page=${page}&limit=${limit}`);
            console.log("Fetched Posts:", response.data.posts);
            setPosts(response.data.posts);
            setTotalPosts(response.data.totalPosts);
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

 
    // const handleAddPost = async (postContent) => {
    //     try{
    //         const newPost = {
    //             content: postContent,
    //             author_id: currentUser
    //         };
    //         const response = await axios.post("http://localhost:3000/posts", newPost);
    //         setPosts([response.data, ...posts]);
    //         setShowCreatePostModal(false);
    //     }catch (error){
    //         console.error("Error adding posts:", error)
    //     }
    // };

    const handleAddPost = async (postContent) => {
        try {
            const newPost = {
                content: postContent,
                author_id: currentUser
            };
            const response = await axios.post("http://localhost:3000/posts", newPost);
            setPosts([response.data, ...posts]);
            
            setShowCreatePostModal(false);
            
            setTotalPosts(totalPosts + 1);
            fetchPosts(currentPage, postsPerPage);
            
        } catch (error) {
            console.error("Error adding posts:", error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:3000/posts/${postId}`);
            setPosts(posts.filter(post => post.post_id !== postId));
            setTotalPosts(totalPosts - 1);
        } catch (error) {
            console.error("Error deleting post: ", error);
        }
    };

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchPosts(pageNumber, postsPerPage);
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
                <button 
                    className={`view-all-posts ${clickedButton === 'all' ? 'clicked' : ''}`} 
                    onClick={() => {
                        setViewMode("all");
                        setClickedButton('all');
                    }}
                >
                    View All Posts
                </button>
                <button className={`your-posts ${clickedButton === 'your' ? 'clicked' : ''}`} onClick={() => {
                        if (currentUser) {
                            setViewMode("your");
                            setClickedButton('your');
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
                        userAvatar={getUserAvatar(post.author.username)}
                        userPostContent={post.content}
                        timestamp={post.createdAt}
                        showDelete={post.author_id === currentUser}
                        likeCount={post.likes.length}
                        onDelete={()=> handleDeletePost(post.post_id)}
                        postId={post.post_id}
                        currentUser={currentUser}
                        fetchPosts={fetchPosts}
                        page={currentPage}
                        limit={postsPerPage}
                    />
                ))}
            </div>
            {/* <div className="pagination-buttons">
                    <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageClick(index + 1)}
                            className={index + 1 === currentPage ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div> */}
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, page) => handlePageClick(page)}
                        renderItem={(item) => (
                        <PaginationItem
                            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...item}
                            sx={{
                                color: item.page === currentPage ? 'black' : 'white', // Change text color for current page
                                backgroundColor: item.page === currentPage ? '#E6117C' : 'transparent', // Background for current page
                                borderRadius: 1,
                                border: '1px solid', // Add border to make it stand out
                                borderColor: item.page === currentPage ? '#E6117C' : 'transparent', // Border color for current page
                                '&:hover': {
                                  backgroundColor: item.page === currentPage ? 'yellow' : '#555', // Background color on hover
                                },
                                marginBottom: '30px',
                              }}
                        />
                        )}
                        sx={{
                        '.MuiPaginationItem-root': {
                            color: 'white', // Adjust color here
                        },
                        '.MuiPaginationItem-previousNext': {
                            color: 'white', // Adjust color here
                        }
                        }}
                    />
                </Stack>
               
            </div>
        </>
    )
};

export default Forum;