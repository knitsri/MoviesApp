import React from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from "react-router"
function Login() {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  function onSubmitSuccess(jwtToken) {
    Cookies.set("jwt_token",jwtToken,{expires:30})
    navigate("/",{replace:true})
  }

  function onSubmitFailure(error) {
    setShowSubmitError(true)
    setErrorMsg(error)
  }

  async function onSubmitForm(event) {
    event.preventDefault()
    const userDetails = {username,password}
    const options = {
      method : "POST" ,
      body : JSON.stringify(userDetails)
    } 
    const response = await fetch('/login',options) 
    const data = await response.json() 
    if(response.ok) {
      onSubmitSuccess(data.jwt_token)
    }
    else{
      onSubmitFailure(data.error_msg)
    }
  }
  function onChangeUsername(event) {
    setUsername(event.target.value)
  }
  function onChangePassword(event) {
    setPassword(event.target.value)
  }
 
  return (
    <>
    <div className='min-h-screen bg-black flex items-center justify-center p-4 md:bg-[url("https://res.cloudinary.com/dndcaj4r2/image/upload/v1753888047/netfilx_1_peklvu.png")] '>
      <div className='absolute top-5 left-5 md:left-10'>
        <img 
          className='h-8 md:h-10' 
          src="https://res.cloudinary.com/dndcaj4r2/image/upload/v1753959525/Group_7399_xlevzh.png" 
          alt="logo" 
        />
      </div>
      <div className='w-full max-w-md  rounded-lg p-8 md:p-12 bg-[#0C0B10] bg-opacity-50'>
        <h1 className='text-white text-3xl font-bold mb-8 md:text-center'>Login</h1>
        <form onSubmit={onSubmitForm} className='space-y-6'>
          <div className='space-y-2'>
            <label htmlFor="username" className='block text-gray-300 text-sm font-medium'>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={onChangeUsername}
              placeholder="Enter username"
              className='w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500'
              required
            />
          </div>
          
          <div className='space-y-2'>
            <label htmlFor="password" className='block text-gray-300 text-sm font-medium'>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={onChangePassword}
              placeholder="Enter password"
              className='w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500'
              required
            />
          </div>
          
          {showSubmitError && (
            <p className='text-red-500 text-sm'>{errorMsg}</p>
          )}
          <button
              type="submit"
              className="w-full py-3 rounded font-medium bg-red-600 hover:bg-red-700 text-white"
            >
              Log In
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
export default Login
