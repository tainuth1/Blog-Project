import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useOutletContext, useParams } from "react-router-dom";
import Comment from "./Comment";
import { useAuth } from "./auth/AuthProvider";

const ViewContent = () => {
  const { setShowContentPopUp } = useOutletContext();
  const { PostId } = useParams();
  const [showBlog, setShowBlog] = useState({});
  const [commentValue, setCommentValue] = useState("");
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [ownerPostData, setOwnerPostData] = useState({});
  const [reRenderComments, setReRenderComments] = useState(false);
  const closeModal = () => {
    setShowContentPopUp(false);
  };
  const postComment = async () => {
    const comment = {
      id: `${Date.now()}`,
      postId: PostId,
      userId: user.id,
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
        setShowBlog(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [PostId, reRenderComments]);

  const { id, title, description, thumbnail, category } = showBlog;

  return (
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
          <div className="w-full px-3 py-1 border-b-[1px] bg-slate-200">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-[#FF5F56] cursor-pointer"></div>
                <div className="w-4 h-4 rounded-full bg-[#FFBD2E] cursor-pointer"></div>
                <div className="w-4 h-4 rounded-full bg-[#27c93f] cursor-pointer"></div>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 transition-all flex justify-center items-center rounded-full text-gray-600 hover:text-gray-700 active:scale-[0.95] hover:bg-gray-100"
              >
                <i className="bx bx-x text-3xl "></i>
              </button>
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
                <button className="border-2 border-blue-600 px-6 py-2 rounded-lg text-blue-700 active:scale-[0.95]">
                  Follow
                </button>
              </div>
              <div className="mt-7 flex justify-between items-center py-2 border-b border-gray-500">
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 border flex justify-center rounded-full items-center text-lg text-gray-800 active:scale-[0.97]">
                    <i className="bx bxs-heart"></i>
                  </button>
                  <span className="text-sm">5.1K</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 border flex justify-center rounded-full items-center text-lg text-gray-800 active:scale-[0.97]">
                    <i className="bx bx-comment-detail"></i>
                  </button>
                  <span className="text-sm">{comments.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 border flex justify-center rounded-full items-center text-lg text-gray-800 active:scale-[0.97]">
                    <i className="bx bxs-bookmark-star"></i>
                  </button>
                  <span className="text-sm">984</span>
                </div>
              </div>
              <div className="w-full h-full">
                <div className="">
                  <ul className="flex border-b border-gray-500">
                    <li className="w-1/2 py-2 cursor-pointer text-center text-blue-600">
                      Comments
                    </li>
                    <li className="w-1/2 py-2 cursor-pointer text-center text-gray-700">
                      Create Posts
                    </li>
                  </ul>
                </div>
                <div className="w-full h-full pb-64 overflow-y-scroll flex flex-col mt-3 gap-4">
                  {comments.length === 0 ? (
                    <p className="text-center text-gray-600">No Comment</p>
                  ) : (
                    comments.map((comment) => {
                      return (
                        <Comment
                          key={comment.id}
                          comments={comment}
                          showBlog={showBlog}
                          setReRenderComments={setReRenderComments}
                          reRenderComments={reRenderComments}
                        />
                      );
                    })
                  )}
                </div>
              </div>
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
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default ViewContent;
