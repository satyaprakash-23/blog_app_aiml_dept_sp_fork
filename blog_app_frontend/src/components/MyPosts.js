import useUserPost from "./utils/useUserPost.js";
import CardsGridsDesign from "./utils/CardsGridDesign.js";
import { useEffect, useState } from "react";
import Loader from "./GlobalLoader.js";

const MyPosts = () => {
  const userPosts = useUserPost();
  // console.log(userPosts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userPosts) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [userPosts]);

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
        className={isLoading ? "hidden" : "flex justify-center w-full h-full"}
      >
        <CardsGridsDesign data={userPosts} pageTitle={"My Posts"} />
      </div>
    </div>
  );
};

export default MyPosts;
