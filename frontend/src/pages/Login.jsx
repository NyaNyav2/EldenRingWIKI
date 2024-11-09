import React,{useState} from 'react'
import {  FormField } from "../components";
import { useLogin } from '../hooks/useLogin';
function Login() {
  
  const [email,setEmail] = useState('');
  const [password,setPassword]= useState('')
  const {login,error,isLoading} =useLogin() 
  const handelSumbit = async(e)=>{
   e.preventDefault()
   await login(email,password)

  }
  return (
    <section className="max-w-7xl mx-auto pt-20">
      <div>
        <h1 className="font-extrabold text-yellow-600 text-[32px]">
          Log In !!!
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[700px]">
         Ready to explore?
        </p>
      </div>
      <form action="login" onSubmit={handelSumbit}>

      <div className="mt-10">
        <FormField
          labelName="Email"
          type="text"
          name="text"
          placeholder="123@email.com"
          value={email}
          handleChange={(e)=>setEmail(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <FormField
          labelName="password"
          type="text"
          name="text"
          placeholder="*********"
          value={password}
          handleChange={(e)=>setPassword(e.target.value)}
        />
      </div>
      <div className='mt-5'>
          <button className='w-full h-10 bg-white bg-opacity-20 text-yellow-700 rounded-lg border-yellow-700 hover:border-2 ' disabled={isLoading}>Sumbit</button>
      </div>
      {error && (<div className='text-yellow-700 font-bold text-xl text-center mt-5'>{error}</div>)}
      </form>
    </section>
  )
}

export default Login