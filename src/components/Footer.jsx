import React from 'react'
// mt-[100px]
function Footer() {
  return (
    <div className='flex flex-col justify-center items-center py-4 '>
      <div className='flex gap-6'>
        <img src="https://res.cloudinary.com/dndcaj4r2/image/upload/v1754020467/google_jhsjw1.png"/>
        <img src="https://res.cloudinary.com/dndcaj4r2/image/upload/v1754020507/twitter_uj2hj3.png"/>
        <img src="https://res.cloudinary.com/dndcaj4r2/image/upload/v1754020538/instagram_yxt3hb.png"/>
        <img src="https://res.cloudinary.com/dndcaj4r2/image/upload/v1754020562/youtube_ydcipr.png"/>
      </div>
      <div className='text-white mt-5'>Contact Us</div>
    </div>
  )
}

export default Footer
