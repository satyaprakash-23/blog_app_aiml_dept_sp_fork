import { useEffect, useState } from "react";
import RTE from "./RTE.js";
import DescriptionTitleImageForms from "./DescriptionTitleImageForms.js";
import Loader from "./Loader.js";

const AddPost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, [2300]);
  }, []);

  const publishBlog = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(content));
    

    // try {
    //     const response = await fetch(
    //       "https://your-api-endpoint.com/api/posts",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json", // Indicating the content type is JSON
    //         },
    //         body: {
    //             title: title,
    //             description: description,
    //             poste

    //         }  // Sending the data as a JSON string
    //       }
    //     );
        
    // } catch (error) {
        
    // }
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