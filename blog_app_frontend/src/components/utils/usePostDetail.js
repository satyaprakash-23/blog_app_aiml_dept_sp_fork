import { useEffect, useState } from "react"


const usePostDetail = (id) =>{
    console.log("satya" + id);
    
    const[postDetail,setpostDetail] = useState(null);
    async function getPostDetail(){
        const response = await fetch(`http://localhost:4800/api/v1/post/getPost/${id}`);
        console.log(response);
        const json = await response.json();
        setpostDetail(json);
    }
    useEffect(()=>{
        getPostDetail();
    },[]);
    return postDetail;
}

export default usePostDetail;