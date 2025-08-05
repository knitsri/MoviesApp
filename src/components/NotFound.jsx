import React from 'react'
import { useNavigate } from 'react-router'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className='bg-[url("https://res.cloudinary.com/dndcaj4r2/image/upload/v1754124451/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_ipnrnk.png")] bg-opacity-100 min-h-screen bg-cover flex flex-col justify-center items-center text-white text-center px-4'>
      <h1 className='text-[40px] sm:text-[60px] md:text-[80px] font-bold'>Lost Your Way ?</h1>
      <p className='text-[16px] sm:text-[20px] md:text-[23px] font-[Roboto] mt-2 sm:mt-4'>
        We are sorry that page you requested could not be found
      </p>
      <p className='text-[14px] sm:text-[18px] md:text-[20px] font-[Roboto] mt-2 sm:mt-4'>
        Please go back to the homepage.
      </p>
      <button 
        onClick={() => navigate('/',{replace:true})} 
        className='bg-white text-black mt-[20px] sm:mt-[30px] p-3 sm:p-4 rounded-md text-sm sm:text-base'
      >
        Go to Home
      </button>
    </div>
  )
}

export default NotFound