import useUserPost from "./utils/useUserPost";
import CardsGridsDesign from "./utils/CardsGridDesign";
const MyPosts = () => {
  const userPosts = useUserPost();
  console.log(userPosts);

  return (
    <CardsGridsDesign data={userPosts}/>
  );
};

export default MyPosts;
