import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { AuthContext } from '../Context'
import { useContext } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'

function Profile() {
  const {username,password,setUsername, setPassword} = useContext(AuthContext)
  
  const length = password.length
  const navigate = useNavigate()
  function onClickLogOutBtn() {
       navigate('/auth')
       localStorage.removeItem('username')
       localStorage.removeItem('password')
       Cookies.remove('jwt_token')
       setUsername('')
       setPassword('')
  }

  return (
    <div className='min-h-screen'>
      <Header/>
      <div className='p-[80px]  text-[#131313] '>
        <h1 className='text-[25px] font-bold'>Account</h1> 
        <hr className=' border border-[#CBD5E1] mt-5 mb-5'/>
        <div className='flex flex-row gap-3'>
            <p className='text-[#94A3B8] text-[18px]'>Membership</p>
            <div>
                <p>{username}</p>
                <p>{`Password: ${"*".repeat(length)}`}</p>
            </div>
        </div>
        <hr className=' border border-[#CBD5E1] mt-5 mb-5'/>
        <div className='flex flex-row gap-4 items-center'>
            <p className='text-[#94A3B8] text-[18px]'>Plan details</p>
            <p>Premium</p>
            <p className='border border-black pl-1 pr-1 min-w-[80px]'>Ultra HD</p>
        </div>
        <hr className=' border border-[#CBD5E1] mt-5 mb-5'/>
        <div className='flex justify-center items-center '>
            <button onClick={onClickLogOutBtn} className='bg-[#E50914] text-white xs:mt-[80px]  sm:mt-[60px] pl-3 pr-3 p-2 rounded-md'>Logout</button>
        </div>
      </div>
      <div className='bg-[#0f0f0f] fixed bottom-0 w-full xs:p-[45px] md:p-[40px] '>
         <Footer/>
      </div>
    </div>
  )
}

export default Profile
