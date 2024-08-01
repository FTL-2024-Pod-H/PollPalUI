import React, { useState, useEffect } from "react";
import "./Forum.css";
import Post from "./Post/Post";
import ForumModal from "./ForumModal/ForumModal";
import NotLoggedPrompt from "./NotLoggedPrompt/NotLoggedPrompt";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PROD_LINK = import.meta.env.VITE_PROD_LINK;

// DECODE TOKEN MANUALY
function decodeJWT(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function getUserAvatar(username) {
  // return `https://robohash.org/${username}.png?set=set1`;
  return `https://ui-avatars.com/api/?name=${username}&background=random`;
  // return `https://robohash.org/${username}.png?set=set2`;
  // return `https://api.multiavatar.com/${username}.png`;
}

function Forum() {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showLoginPromptModal, setShowLoginPromptModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [viewMode, setViewMode] = useState("all");
  console.log("Current view mode: ", viewMode);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [totalPosts, setTotalPosts] = useState(0);
  const [clickedButton, setClickedButton] = useState(`all`);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = decodeJWT(token);
        setCurrentUser(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token: ", error);
      }
    } else {
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (viewMode === "your" && currentUser) {
      fetchUserPosts(currentUser, currentPage, postsPerPage).finally(() =>
        setLoading(false)
      );
    } else {
      fetchPosts(currentPage, postsPerPage).finally(() => setLoading(false));
    }
  }, [viewMode, currentPage, postsPerPage, currentUser]);

  const fetchPosts = async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(
        `${PROD_LINK}/posts?page=${page}&limit=${limit}`
      );
      console.log("Fetched Posts:", response.data.posts);
      setPosts(response.data.posts);
      setTotalPosts(response.data.totalPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchUserPosts = async (userId, page = 1, limit = 10) => {
    try {
      const response = await axios.get(
        `${PROD_LINK}/posts/user/${userId}?page=${page}&limit=${limit}`
      );
      console.log("Fetched User Posts:", response.data.posts);
      setPosts(response.data.posts);
      setTotalPosts(response.data.totalPosts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const filteredPosts =
    viewMode === "your"
      ? posts.filter((post) => post.author_id === currentUser)
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
    try {
      const newPost = {
        content: postContent,
        author_id: currentUser,
      };
      const response = await axios.post(`${PROD_LINK}/posts`, newPost);
      setPosts([response.data, ...posts]);

      setShowCreatePostModal(false);

      setTotalPosts(totalPosts + 1);
      setViewMode("all");
      setClickedButton("all");

      setCurrentPage(1);
      fetchPosts(currentPage, postsPerPage);
    } catch (error) {
      console.error("Error adding posts:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${PROD_LINK}/posts/${postId}`);
      setPosts(posts.filter((post) => post.post_id !== postId));
      if (viewMode === "your") {
        setTotalPosts(totalPosts - 1);
        // setCurrentPage(1)
        fetchUserPosts(currentUser, currentPage, postsPerPage);
      } else {
        setTotalPosts(totalPosts - 1);
        // setCurrentPage(1);
        fetchPosts(currentPage, postsPerPage);
      }
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="forum-page-container">
        <div className="form-title-button">
          <div className="forum-info-section">
            <h3 className="forum-title">Forum</h3>
            <p className="forum-description">
              See what other PollPals have to say
            </p>
          </div>
          <button className="Btn" onClick={handleCreatePost}>
            <div className="sign">+</div>
            <div className="text">Create</div>
          </button>
          <div className="switch-posts-buttons-container">
            <button
              className={`view-all-posts ${
                clickedButton === "all" ? "clicked" : ""
              }`}
              onClick={() => {
                setViewMode("all");
                setClickedButton("all");
                setCurrentPage(1);
              }}
            >
              View All Posts
            </button>
            <button
              className={`your-posts ${
                clickedButton === "your" ? "clicked" : ""
              }`}
              onClick={() => {
                if (currentUser) {
                  setViewMode("your");
                  setClickedButton("your");
                  setCurrentPage(1);
                  fetchUserPosts(currentUser, currentPage, postsPerPage);
                } else {
                  setShowLoginPromptModal(true);
                }
              }}
            >
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
        {loading ? (
          <div className="custom-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ) : (
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
                onDelete={() => handleDeletePost(post.post_id)}
                postId={post.post_id}
                currentUser={currentUser}
                fetchPosts={fetchPosts}
                page={currentPage}
                limit={postsPerPage}
              />
            ))}
          </div>
        )}
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
                  color: item.page === currentPage ? "black" : "white",
                  backgroundColor:
                    item.page === currentPage ? "#E6117C" : "transparent",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor:
                    item.page === currentPage ? "#E5E2E2" : "transparent",
                  "&:hover": {
                    backgroundColor:
                      item.page === currentPage ? "yellow" : "#E5E2E2",
                  },
                  marginBottom: "30px",
                }}
              />
            )}
            sx={{
              ".MuiPaginationItem-root": {
                color: "black",
              },
              ".MuiPaginationItem-previousNext": {
                color: "black",
              },
            }}
          />
        </Stack>
      </div>
    </>
  );
}

export default Forum;
