import { useEffect, useState } from "react";
import RTE from "./RTE.js";
import DescriptionTitleImageForms from "./DescriptionTitleImageForms.js";
import Loader from "./Loader.js";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, [3000]);
  }, []);

  const publishBlog = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(content));

    if (!image) {
      alert("Please select an image!");
      return;
    }

    // setIsLoading(true);

    // Create FormData instance
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", JSON.stringify(content));
    formData.append("description", description);
    formData.append("poster", image); // Append the file

    try {
      const response = await fetch(
        "http://localhost:4800/api/v1/post/createPost",
        {
          method: "POST",
          credentials: "include",
          body: formData, // Send FormData directly
        }
      );

      console.log("response: ", response);
      

      const result = await response.json();

      console.log("result: ", result);

      if (!result) {
        console.log("Failed to create post.");
        return;
      }

      if (result.message === "Post created successfully") {
        setContent("");
        setTitle("");
        setDescription("");
        setImage(null);
        navigate(`/all-posts/${result.post?._id}`);
      }
    } catch (error) {
      console.log("Failed to create post:", error);
    }
  }
//   NOTE: TODO: I need to setup multer for image upload in the backend and then send the image as a formdata object.

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
        className={isLoading ? "hidden" : "flex justify-center w-full h-[80vh]"}
      >
        <div className="mx-2">
          <RTE setContent={setContent} />
        </div>
        <div className="mx-2">
          <DescriptionTitleImageForms
            setDescription={setDescription}
            setImage={setImage}
            setTitle={setTitle}
            publishBlog={publishBlog}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPost;


/*
showEntireThings={() =>
              console.log(JSON.stringify(content), title, description, image)
            }
*/