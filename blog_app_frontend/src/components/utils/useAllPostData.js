import { useEffect, useState } from "react"


const useAllPostData = ()=>{
    const [AllPostData,setAllPostData] = useState(null);
    
    async function getAllPostData() {
        const response = await fetch("http://localhost:4800/api/v1/post/getAllPosts");
        // console.log(response.json());
        const json = await response.json();
        setAllPostData(json?.data);
        // console.log(json);
        
        // if (response) {
        //     const json = await JSON.parse(response.data);
        //     setAllPostData(json);
        // }
        // else {
        //     console.log("NULL",response);
        // }
    }
    useEffect(()=>{
        getAllPostData();
    },[]);

    return AllPostData;
}

export default useAllPostData;