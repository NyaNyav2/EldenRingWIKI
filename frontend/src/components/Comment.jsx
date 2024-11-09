import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { FaArrowRight } from "react-icons/fa";
import { useAddComment } from "../hooks/useAddComment.jsx";
import { useDeleComment } from "../hooks/useDeleComment.jsx";
function Comment(Type) {
  const { user } = useAuthContext();
  const [userComment, setComment] = useState("");
  const { AddComment, isLoading, error } = useAddComment();
  const { deleComment, isLoadingDeleComment, errorDeleComment } =useDeleComment()
  const handelSumbit = async (e) => {
    e.preventDefault();
    await AddComment(Type, userComment);
  };
  const handlerDele = async (_id)=>{
    if(errorDeleComment){
      console.log(errorDeleComment)
    }else{
      window.location.reload();
    }
    await deleComment(Type,_id);
  }
  const { comment } = Type;
  
  return (
    <div className="h-full bg-gray-900 rounded-2xl p-4 ">
      <h1 className="text-yellow-700 font-bold text-xl ">Comment</h1>
      {error && (
        <div className="text-yellow-700 font-bold text-xl text-start w-full">
          {error}
        </div>
      )}
      {user && (
        <div className="bg-white rounded-xl mt-2 p-3">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-black"
          >
            User:{" "}
            <span className="text-[15px] text-yellow-700">{user.email}</span>
          </label>
          <form action="" className="flex ">
            <input
              type="text"
              placeholder="Your comment"
              className="bg-gray-50 bg-opacity-10 border-b-4 text-black text-sm border-black focus:ring-[#6469ff] focus:border-yellow-700   outline-none block w-full p-2 "
              onChange={(e) => setComment(e.target.value)}
            />
            <button disabled={isLoading} onClick={handelSumbit}>
              <FaArrowRight
                color="yellow"
                size={30}
                className="bg-gray-900 rounded-full w-[30px] h-[30px] p-2 hover:bg-black cursor-pointer"
              />
            </button>
          </form>
        </div>
      )}
      {comment && (
        <ul className="flex flex-col-reverse justify-between p-3  mt-6 ">
          {comment.map((cmt) => (
            <li key={cmt._id} className=" flex  text-lg font-bold  text-yellow-700 border-b-2 mb-4 border-black p-3 w-full">
              {cmt.userEmail}:{' '}
              <span className="text-base ml-3 mt-[0.18rem] font-medium  w-full text-white">
                {cmt.userComment}
              </span>
              {user.email===cmt.userEmail&&(
                <span className="cursor-pointer  hover:text-white"><button disabled={isLoadingDeleComment} onClick={() => handlerDele(cmt._id)} >X</button></span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Comment;
