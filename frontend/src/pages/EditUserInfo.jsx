import React,{useState} from 'react'
import {  FormField,Loader } from "../components";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from 'react-router-dom';
function EditUserInfo
() {
    const { user } = useAuthContext();
    const [userName, setUserName] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userAge, setUserAge] = useState('');
    const [photo, setPhoto] = useState();
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const id = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        let photoBase64 = null; // Initialize as null in case no photo is uploaded
    
        // Check if a photo is provided
        if (photo) {
            const reader = new FileReader();
            reader.readAsDataURL(photo);
            await new Promise((resolve) => {
                reader.onloadend = () => {
                    photoBase64 = reader.result;
                    resolve();
                };
            });
        }
    
        // Construct user data object, adding the photo only if it exists
        const userData = {
            userId: user.userID,
            userName,
            userGender,
            userAge,
            ...(photoBase64 && { Photo: photoBase64 }) // Only add Photo if photoBase64 is defined
        };
    
        try {
            const response = await fetch(`http://localhost:8080/api/userinfo/${user.userID}/${id.infoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
    
            if (response.ok) {
                const data = await response.json();
                setResponseMessage("User info updated successfully!");
            } else {
                const errorData = await response.json();
                setResponseMessage(errorData.error || "Failed to update user info.");
            }
        } catch (error) {
            setResponseMessage("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
            setTimeout(function() {
                window.location.replace(`/user/${user.userID}`);
              }, 1000); // 10000 milliseconds = 10 seconds
        }
    };
    
  return (
    <section className="max-w-7xl mx-auto pt-20">
      <div>
        <h1 className="font-extrabold text-yellow-600 text-[32px]">
          Edit ur info 
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[700px]">
         Ready to explore?
        </p>
      </div>
      <form  onSubmit={handleSubmit} >

      <div className="mt-10">
        <FormField
          labelName="Name"
          type="text"
          name="text"
          placeholder="Nguyễn Văn A"
          value={userName}
          handleChange={(e)=>setUserName(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <FormField
          labelName="Gender"
          type="text"
          name="text"
          placeholder="Male,Female,Other"
          value={userGender}
          handleChange={(e)=>setUserGender(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <FormField
          labelName="Age"
          type="number"
          name="text"
          placeholder="How old r u ?"
          value={userAge}
          handleChange={(e)=>setUserAge(e.target.value)}
        />
      </div>
      <div className="mt-5">
      <label className='block text-sm font-medium text-white'>Photo</label>
          <input
          className='bg-gray-50 bg-opacity-10 border border-white text-white text-sm rounded-lg focus:ring-[#6469ff] focus:border-yellow-600 outline-none block w-full p-3 '
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
      </div>
      {loading ?(
        <div className="flex justify-center items-center">
        <Loader />
      </div>
      ):(
      <div className='mt-5'>
          <button className='w-full h-10 bg-white bg-opacity-20 text-yellow-700 rounded-lg border-yellow-700 hover:border-2 ' >Sumbit</button>
      </div>
      )}
      </form>
      {responseMessage && <p className='text-yellow-700 font-bold text-xl text-center w-full mt-5'>{responseMessage}</p>}
    </section>
  )
}

export default EditUserInfo
