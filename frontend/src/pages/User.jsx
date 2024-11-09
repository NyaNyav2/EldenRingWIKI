import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { redirect, useParams } from "react-router-dom";
import { Loader } from "../components";
import { useLogout } from '../hooks/useLogout';
import { MdDelete } from "react-icons/md";
import { banner } from '../assets/images';
import { useDeleBookMark } from '../hooks/useDeleBookMark';
function User() {
  const { id: currentID } = useParams(); // Get ID and type from the URL parameters
  const ItemPath = `http://localhost:8080/api/user/${currentID}`;
  const [loading, setLoading] = useState(false);
  const [itemData, setItemData] = useState(null);
  
  const {deleBookMark,isLoading,error} = useDeleBookMark()
  const { logout } = useLogout();
  const handlerClick = () => {
    logout();
    window.location.replace("/");
  };
  const handlerDele = async (productId, productType) => {
    await deleBookMark(productId,productType);
    if(error){
      console.log(error)
    }else{
      window.location.reload();
    }
  };
  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(ItemPath, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setItemData(result.data); // Set the item data
      } else {
        alert("Failed to fetch data");
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentID]);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="text-center text-white">
        <p>No data available</p>
      </div>
    );
  }

// Destructure common fields
const {
bookmarks,
userInfo,

} = itemData;
const info = userInfo?.info || [];
  return (
    <section className="max-w-7xl mx-auto py-20  ">
<div className="grid grid-cols-5 grid-rows-5 gap-4">
    <div className="col-span-5 h-[120px]"><img src={banner} alt="" className='h-full w-full object-cover' /></div>
    <div className="col-span-2 row-span-4 row-start-2 h-full bg-black  flex flex-col  items-center rounded-lg">
      {info.length>0 && info[0] ?.userPhoto ?(
         <div className='w-full flex justify-center items-center py-2 mt-7  '>
         <img src={info[0].userPhoto} alt="user" className='w-[101px] h-[98px] bg-red-900 rounded-full border-[4px] border-yellow-700 object-cover ' />
       </div>
      ):(
      <div className='w-full flex justify-center items-center py-2 mt-7 '>
        <img src="" alt="user" className='w-[101px] h-[98px] bg-red-900 rounded-full border-[4px] border-yellow-700 ' />
      </div>
      )}
      {info.length>0 && info[0] ?._id  &&(
        <Link to={`/userinfo/${userInfo._id}/${info[0]._id}`}>
        <p className='text-white text-sm font-medium text-center hover:text-blue-gray-700'>Edit ur info</p>
        </Link>
        )}
      <div className='flex flex-col justify-center'>
        <h1 className='text-xl font-bold text-white '>Email: <span className='text-yellow-700'>{userInfo.email}</span> </h1>
        {!info &&(
        <Link to={'/userinfo'}>
        <p className='text-white text-sm font-medium text-center hover:text-blue-gray-700'>Tell us more about u ?</p>
        </Link>
        )}
        <ul>
        {info.map((inf)=>(
          <li key={inf._id}>
            <div>
            <h1 className='text-white font-bold text-xl '>
                          User Name: {inf.userName}
            </h1>
            <h1 className='text-white font-bold text-xl '>
                          Gender: {inf.userGender}
            </h1>
            <h1 className='text-white font-bold text-xl '>
                          Age: {inf.userAge}
            </h1>
            </div>
          </li>
        ))}
        </ul>
      
        <button
              onClick={handlerClick}
              className="font-bold  cursor-pointer text-[20px] text-white hover:text-yellow-400 "
            >
              Log Out
            </button>
            
      </div>
    </div>
    <div className="col-span-3 row-span-4 col-start-3 row-start-2 h-full bg-black rounded-lg p-6">
     {bookmarks && (
              <div className="">
                <h2 className="font-bold text-white text-[24px]">BookMark Items</h2>
                <ul className="">
                  {bookmarks.map((bks) => (
                    <li key={bks._id}>
                      <div className='w-full flex p-2 items-center border-t-2 border-white '>
                      <img src={bks.image} alt="" className='w-[53px] h-[48px]' />
                         <div className='px-3 flex-grow'>
                          <h1 className='text-yellow-700 font-bold text-lg '>
                          {bks.name}
                          </h1>
                          <p className='text-xs font-medium text-white'>{bks.description}</p>
                         </div>
                         <button className='self-center' onClick={() => handlerDele(bks.productId, bks.productType)} disabled={isLoading}><MdDelete size={25} color='gray'/></button>
                      </div>
                     
                    </li>
                  ))}
                </ul>
              </div>
            )} 
    </div>
</div>

    </section>
    
  )
}

export default User