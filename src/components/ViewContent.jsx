import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutletContext, useParams } from "react-router-dom";
import Comment from "./Comment";
import { useAuth } from "./auth/AuthProvider";
import CreatorPost from "./CreatorPost";

const ViewContent = () => {
  const { setShowContentPopUp } = useOutletContext();
  const { PostId } = useParams();
  const [showBlog, setShowBlog] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const [comments, setComments] = useState([]);
  const [ownerPostData, setOwnerPostData] = useState({});
  const [reRenderComments, setReRenderComments] = useState(false);
  const [likes, setLike] = useState([]);
  const [favorites, setFavorite] = useState();
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [activeTab, setActiveTab] = useState("comments");

  const closeModal = () => {
    setShowContentPopUp(false);
  };
  const postComment = async () => {
    const comment = {
      id: `${Date.now()}`,
      postId: PostId,
      userId: `${user.id}`,
      content: commentValue,
      created_at: new Date().toISOString(),
    };
    if (commentValue.trim() != "") {
      try {
        const response = await fetch("http://localhost:3000/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data from api.");
        }
        const newComment = await response.json();
        setCommentValue("");
        setComments((prevComments) => [...prevComments, newComment]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const likePost = async () => {
    if (!user) return; // Ensure user is logged in
    const isLiked = likes.includes(user.id);
    try {
      const updatedLikes = isLiked
        ? likes.filter((userId) => userId !== user.id)
        : [...likes, user.id];

      const response = await fetch(`http://localhost:3000/posts/${PostId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: updatedLikes }),
      });

      if (!response.ok) {
        throw new Error("Failed to update likes");
      }
      setLike(updatedLikes);
      setReRenderComments(!reRenderComments);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  const liked = () => {
    return showBlog.likes.includes(user.id) ? "text-red-600" : "";
  };
  const addToFavorite = async () => {
    if (!user) return;
    const isFavorited = favorites.includes(user.id);
    try {
      const updateFavorites = isFavorited
        ? favorites.filter((userId) => userId !== user.id)
        : [...favorites, user.id];
      const response = await fetch(`http://localhost:3000/posts/${PostId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorites: updateFavorites }),
      });
      if (!response.ok) {
        throw new Error("Failed to update add to favorite");
      }
      setFavorite(updateFavorites);
      setReRenderComments(!reRenderComments);
      setAlert(true);
      setAlertMessage(
        isFavorited ? "Removed from favorites" : "Added to favorites"
      );
      setTimeout(() => {
        setAlert(false);
        setAlertMessage("");
      }, 2500);
    } catch (error) {
      console.error("Error add to favorite :", error);
    }
  };
  const favorited = () => {
    return showBlog.favorites.includes(user.id) ? "text-yellow-500" : "";
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const responce = await fetch(`http://localhost:3000/posts/${PostId}`);
        const commentResponse = await fetch(
          `http://localhost:3000/comments?postId=${PostId}`
        );

        if (!responce.ok) {
          throw new Error("Fail to fetch data from api");
        }
        if (!commentResponse.ok) {
          throw new Error("Fail to fetch comment from api");
        }

        const data = await responce.json();
        const commentData = await commentResponse.json();
        const ownerPostResponse = await fetch(
          `http://localhost:3000/users/${data.userId}`
        );
        if (!ownerPostResponse.ok) {
          throw new Error("Fail to fetch comment from api");
        }
        const ownerPostData = await ownerPostResponse.json();
        setOwnerPostData(ownerPostData);
        setComments(commentData);
        setLike(data.likes);
        setFavorite(data.favorites);
        setShowBlog(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [PostId, reRenderComments]);
  useEffect(() => {
    const getCurrentUserData = async () => {
      const getCurrentUser = await fetch(
        `http://localhost:3000/users/${user.id}`
      );
      if (!getCurrentUser.ok) {
        throw new Error("Fail to fetch current user from api");
      }
      const currentUserData = await getCurrentUser.json();
      setCurrentUser(currentUserData);
    };
    getCurrentUserData();
  }, []);

  const followUser = async (currentUserId, targetUserId) => {
    if (currentUser.following.includes(targetUserId)) return;
    const updateFollowing = [...(currentUser.following || []), targetUserId];
    const updateFollowers = ownerPostData.followers.includes(currentUserId)
      ? ownerPostData.followers
      : [...(ownerPostData.followers || []), currentUserId];
    try {
      await fetch(`http://localhost:3000/users/${currentUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ following: updateFollowing }),
      });
      await fetch(`http://localhost:3000/users/${targetUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followers: updateFollowers }),
      });
      setReRenderComments(!reRenderComments);
      setCurrentUser((prev) => ({
        ...prev,
        following: updateFollowing,
      }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  const unfollowUser = async (currentUserId, targetUserId) => {
    if (!currentUser.following.includes(targetUserId)) return;
    const updateFollowing = currentUser.following.filter(
      (userId) => userId !== targetUserId
    );
    const updateFollowers = ownerPostData.followers.filter(
      (userId) => userId !== currentUserId
    );
    try {
      await fetch(`http://localhost:3000/users/${currentUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ following: updateFollowing }),
      });
      await fetch(`http://localhost:3000/users/${targetUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followers: updateFollowers }),
      });
      setReRenderComments(!reRenderComments);
      setCurrentUser((prev) => ({
        ...prev,
        following: updateFollowing,
      }));
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };
  const followButton = () => {
    const isFollowing = ownerPostData.followers.includes(user.id);
    console.log(isFollowing);
    if (isFollowing) {
      unfollowUser(user.id, ownerPostData.id);
      setAlert(true);
      setAlertMessage("Unfollowed");
      setTimeout(() => {
        setAlert(false);
        setAlertMessage("");
      }, 2500);
    } else {
      followUser(user.id, ownerPostData.id);
      setAlert(true);
      setAlertMessage("Following");
      setTimeout(() => {
        setAlert(false);
        setAlertMessage("");
      }, 2500);
    }
  };

  const { id, title, description, thumbnail, category } = showBlog
    ? showBlog
    : "";
  return showBlog ? (
    <motion.div
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      animate={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      transition={{ duration: 0.1 }}
      className="fixed transition-all inset-0 flex justify-center items-center bg-black z-10"
    >
      <div onClick={closeModal} className="absolute w-full h-full"></div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.15 }}
        className="relative z-20"
      >
        <div className="w-[1100px] h-[700px] bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative w-full px-3 py-1 border-b-[1px] bg-slate-200">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-[#FF5F56] cursor-pointer"></div>
                <div className="w-4 h-4 rounded-full bg-[#FFBD2E] cursor-pointer"></div>
                <div className="w-4 h-4 roundxed-full bg-[#27c93f] cursor-pointer"></div>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 transition-all flex justify-center items-center rounded-full text-gray-600 hover:text-gray-700 active:scale-[0.95] hover:bg-gray-100"
              >
                <i className="bx bx-x text-3xl "></i>
              </button>
              <AnimatePresence>
                {alert ? (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute left-[45%] px-5 py-2 text-white rounded-lg bg-[#212121] bg-opacity-80"
                  >
                    {alertMessage}
                  </motion.div>
                ) : (
                  ""
                )}
              </AnimatePresence>
              <AnimatePresence>
                {alert ? (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute left-[45%] px-5 py-2 text-white rounded-lg bg-[#212121] bg-opacity-80"
                  >
                    {alertMessage}
                  </motion.div>
                ) : (
                  ""
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="w-full h-full flex">
            <div className="w-2/3 h-full px-8 py-5 overflow-y-scroll">
              <h2 className="text-4xl font-bold text-[#242424]">{title}</h2>
              <div className="mt-3 flex gap-2">
                <span className="px-4 py-1 border border-blue-600 rounded-lg text-sm text-blue-600 cursor-pointer">
                  #{category}
                </span>
              </div>
              <div className="w-full aspect-video rounded-2xl overflow-hidden mt-4 cursor-zoom-in">
                <img
                  src={thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 mb-36 text-[#242424] text-lg pl-5 border-l-2 border-blue-600">
                {description}
              </p>
            </div>
            <div className="w-1/3 h-full px-8 py-5 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={ownerPostData.profile}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <h3 className="text-gray-800 font-medium">
                      {ownerPostData.nickname}
                    </h3>
                    <p className="text-[12px] text-gray-600">
                      @{ownerPostData.username}
                    </p>
                  </div>
                </div>
                {showBlog.userId != user.id ? (
                  <button
                    onClick={followButton}
                    className="border-2 border-blue-600 px-6 py-2 rounded-lg text-blue-700 active:scale-[0.95]"
                  >
                    {ownerPostData.followers.includes(user.id)
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-7 flex justify-between items-center py-2 border-b border-gray-500">
                <div className="flex items-center gap-1">
                  <button
                    onClick={likePost}
                    className="w-8 h-8 border flex justify-center rounded-full items-center text-lg text-gray-800 active:scale-[0.97]"
                  >
                    <i
                      className={`bx bxs-heart ${showBlog ? liked() : ""}`}
                    ></i>
                  </button>
                  <span className="text-sm">{showBlog.likes.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 border flex justify-center rounded-full items-center text-lg text-gray-800 active:scale-[0.97]">
                    <i className="bx bx-comment-detail"></i>
                  </button>
                  <span className="text-sm">{comments.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={addToFavorite}
                    className="w-8 h-8 border flex justify-center rounded-full items-center text-lg text-gray-800 active:scale-[0.97]"
                  >
                    <i
                      className={`bx bxs-bookmark-star ${
                        showBlog ? favorited() : ""
                      }`}
                    ></i>
                  </button>
                  <span className="text-sm">{showBlog.favorites.length}</span>
                </div>
              </div>
              <div className="w-full h-full">
                <div className="">
                  <ul className="flex border-b border-gray-500">
                    <li
                      onClick={() => setActiveTab("comments")}
                      className={`w-1/2 py-2 border-b-2 cursor-pointer text-center ${
                        activeTab === "comments"
                          ? "text-blue-600 border-blue-600"
                          : "text-gray-600 border-transparent"
                      }`}
                    >
                      Comments
                    </li>
                    <li
                      onClick={() => setActiveTab("creatorPosts")}
                      className={`w-1/2 py-2 border-b-2 cursor-pointer text-center ${
                        activeTab === "creatorPosts"
                          ? "text-blue-600 border-blue-600"
                          : "text-gray-600 border-transparent"
                      }`}
                    >
                      Creator Posts
                    </li>
                  </ul>
                </div>
                <div className="w-full h-full pb-64 overflow-y-scroll flex flex-col mt-3 gap-4">
                  {activeTab === "comments" ? (
                    comments.length === 0 ? (
                      <p className="text-center text-gray-600">No Comment</p>
                    ) : (
                      comments.map((comment) => (
                        <Comment
                          key={comment.id}
                          comments={comment}
                          showBlog={showBlog}
                          setReRenderComments={setReRenderComments}
                          reRenderComments={reRenderComments}
                        />
                      ))
                    )
                  ) : activeTab === "creatorPosts" ? (
                    <CreatorPost ownerPostId={ownerPostData.id} />
                  ) : null}
                </div>
              </div>
              {activeTab !== "creatorPosts" ? (
                <div className="absolute w-full bottom-[48px] z-[1]">
                  <form
                    action=""
                    className="w-full bg-white border-t-2 py-4 gap-2  flex items-center"
                  >
                    <input
                      type="text"
                      name="comment"
                      autoComplete="off"
                      value={commentValue}
                      onChange={(e) => setCommentValue(e.target.value)}
                      placeholder="Add Comment"
                      className="w-64 border px-4 py-2 text-sm text-gray-700 rounded-lg focus:outline-blue-600"
                    />
                    <button
                      type="button"
                      onClick={postComment}
                      className={`text-sm px-3 font-semibold active:scale-[0.95]  ${
                        commentValue ? "text-red-600" : "text-gray-700"
                      }`}
                    >
                      Post
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  ) : (
    ""
  );
};
export default ViewContent;
