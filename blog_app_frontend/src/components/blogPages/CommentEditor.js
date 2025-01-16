import React, { useState, useRef, forwardRef } from "react";
import AddComment from "../utils/AddComment";
import Tooltip from "./Tooltip";

const CommentEditor = forwardRef(
  ({ postComments, setpostComments, sentPostId, isLoggedIn }, ref) => {
    const formRef = useRef(null);
    // const [requestData,setrequestData] = useState(null);
    const [textAreaContent, settextAreaContent] = useState(null);
    // const [responseMessage, setResponseMessage] = useState(false);
    const handlePostComment = async (e) => {
      e.preventDefault();
      console.log(textAreaContent);
      const response = await AddComment({
        postId: sentPostId,
        comment: textAreaContent,
      });
      // Call AddComment and wait for the response
      if (response.message === "Comment added successfully.") {
        // const allComments = () => PostComments(response.comment.postId);
        // response.comment.postId
        settextAreaContent(null);
        formRef.current.reset();
        const response = await fetch(
          `http://localhost:4800/api/v1/comment/getPostComments/${sentPostId}`,
          {
            credentials: "include",
          }
        );
        const json = await response.json();
        if (json.message === "Comments retrieved successfully.") {
          console.log("Json of getPostComments: ", json);
          setpostComments(json.comments); // Update state with fetched comments
          console.log("comments for spaceX post" + postComments);
        }
        // else {
        //   setpostComments([]); // Handle non-OK HTTP responses gracefully
        // }
      }
    };

    // useEffect(async () => {
    //   const allComments = PostComments(sentPostId);
    //   setpostComments(allComments());
    // }, [responseMessage])

    return (
      <section className="border border-1 border-black  dark:bg-gray-900 rounded-lg shadow-lg antialiased">
        {/* py-8 lg:py-16  */}
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            {/* <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion
          </h2> */}
          </div>
          <form ref={formRef} className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                ref={ref}
                id="comment"
                rows="1"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
                onChange={(event) => {
                  settextAreaContent(event.target.value);
                }}
              ></textarea>
            </div>
            <Tooltip message="Login First" show={!isLoggedIn}>
              <button
                type="submit"
                className={
                  isLoggedIn
                    ? "cursor-pointer inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    : "cursor-not-allowed inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg"
                }
                onClick={(e) => handlePostComment(e)}
                disabled={!isLoggedIn}
              >
                Post comment
              </button>
            </Tooltip>
          </form>
        </div>
      </section>
    );
  }
);

export default CommentEditor;
