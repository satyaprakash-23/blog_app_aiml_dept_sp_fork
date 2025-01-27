import { useEffect, useState } from "react";
import RTE from "./RTE.js";
import DescriptionTitleImageForms from "./DescriptionTitleImageForms.js";
import Loader from "./Loader.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../utils/NotificationProvider.js";
import PublisingLoader from "./LoaderForPublishing.js";
import parse from "html-react-parser";

// { prevContent, prevTitle, prevDescription }
const EditPost = () => {

  const location = useLocation();
  const { prevContent, prevTitle, prevDescription } = location.state || {}; // Destructure the passed state

  // console.log("Previous Content:", prevContent);
  console.log("Previous Title:", prevTitle);
  console.log("Previous Description:", prevDescription);

  function decodeHTMLFromJSON(escapedText) {
      return escapedText
        .replace(/\\u003C/g, "<") // Decode < from \u003C
        .replace(/\\u003E/g, ">") // Decode > from \u003E
        .replace(/\\u0026/g, "&") // Decode & from \u0026
        .replace(/\\u0022/g, '"') // Decode " from \u0022
        .replace(/\\"/g, '"') // Decode escaped double quotes
        .replace(/\\'/g, "'") // Decode escaped single quotes
        .replace(/\\\\/g, "\\") // Decode backslashes
        .replace(/\\n/g, "");
        // .replace(/\\n/g, "<br>"); // Decode newline characters
      // Pehle ye aaise de rha tha:- .replace(/\\n/g, "\n");  -> I changed it to "<br>"!!
    }

    const RenderHTML = ({ htmlContent }) => {
      return <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
    };


  const parsedPrevContent = parse((prevContent));
  console.log("Previous parsed Content:", parsedPrevContent);

  const [content, setContent] = useState(parsedPrevContent);
  const [title, setTitle] = useState(prevTitle);
  const [description, setDescription] = useState(prevDescription);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const { showNotification } = useNotification();

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, [3000]);
  }, []);

  const publishBlog = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    console.log("Dummy Updating blog");
    setTimeout(() => {
      setIsPublishing(false);
    }, 2000);

    // if (
    //   [content, title, description, image].some(
    //     (field) => field === "" || field === null || field === undefined
    //   )
    // ) {
    //   setIsPublishing(false);
    //   showNotification("error", "All fields are required!");
    //   return;
    // }

    //   if (!image) {
    //     setIsLoading(false);
    //     showNotification("error", "Please select an image!");
    //     return;
    //   }

    // setIsLoading(true);

    // Create FormData instance
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", JSON.stringify(content));
    // formData.append("description", description);
    // formData.append("poster", image); // Append the file

    // try {
    //   const response = await fetch(
    //     "http://localhost:4800/api/v1/post/createPost",
    //     {
    //       method: "POST",
    //       credentials: "include",
    //       body: formData, // Send FormData directly
    //     }
    //   );

    //   console.log("response: ", response);

    //   const result = await response.json();

    //   console.log("result: ", result);

    //   if (!result) {
    //     console.log("Failed to create post.");
    //     return;
    //   }

    //   if (result.message === "Post created successfully") {
    //     // setContent("");
    //     // setTitle("");
    //     // setDescription("");
    //     // setImage(null);
    //     setIsPublishing(false);
    //     showNotification("success", "Your blog is published successfully!");
    //     navigate(`/all-posts/${result.post?._id}`);
    //   }
    // } catch (error) {
    //   showNotification("error", "Failed to publish blog!");
    //   setIsPublishing(false);
    //   console.log("Failed to create post:", error);
    // }
  };
  //   NOTE: TODO: I need to setup multer for image upload in the backend and then send the image as a formdata object.

  if (isPublishing) {
    return (
      <div className="h-[80vh] w-screen flex justify-center items-center">
        <PublisingLoader />
      </div>
    );
  } else {
    return (
      <div>
        <div
          className={
            isLoading
              ? "h-[80vh] w-screen flex justify-center items-center"
              : "hidden"
          }
        >
          <Loader />
        </div>
        <div
          className={
            isLoading ? "hidden" : "flex justify-center w-full h-[80vh]"
          }
        >
          <div className="mx-2">
            <RTE setContent={setContent} prevContent={prevContent} />
          </div>
          <div className="mx-2">
            <DescriptionTitleImageForms
              setDescription={setDescription}
              setImage={setImage}
              setTitle={setTitle}
              publishBlog={publishBlog}
              prevDescription={prevDescription}
              prevTitle={prevTitle}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default EditPost;
