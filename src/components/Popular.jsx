// import React from 'react'
// import Cookies from 'js-cookie'
// import { useState,useEffect } from 'react'
// import Header from './Header'
// import Footer from './Footer'
// import MovieItem from './MovieItem'
// import { BeatLoader } from 'react-spinners'

// function Popular() {
//   const jwtToken = Cookies.get('jwt_token')
//   const [popularData,setPopularData] = useState([])
//   const [isLoading,setIsLoading] = useState(true)

//   function renderLoadingView() {
//     return(
//       <div className='flex flex-col justify-center items-center min-h-screen bg-[#0f0f0f]'>
//         <BeatLoader color="#D81F26" size={15}/>
//       </div>
//     )
//   }

//   useEffect(() => {
//     async function getPopularData() {
//       const options = {
//         method : "GET" ,
//         headers : {
//           Authorization : `Bearer ${jwtToken}`
//         }
//       }
//       const response = await fetch('https://apis.ccbp.in/movies-app/popular-movies',options)
//       const data = await response.json()
//       const formattedData = data.results.map(i => ({
//         backDropPath : i.backdrop_path ,
//         id : i.id
//       }))
//       setPopularData(formattedData)
//       setIsLoading(false)
//     }
//     getPopularData()
//   },[])
//   return isLoading ? (
//   renderLoadingView()
// ) : (
//   <div className='bg-[#0f0f0f] min-h-screen pb-[30px]'>
//     <Header />
//     <div className='grid grid-cols-4 gap-4 p-[40px]'>
//       {popularData.map(i => (
//         <MovieItem key={i.id} img={i.backDropPath} uniqueId={i.id} />
//       ))}
//     </div>
//     <div className='mt-[80px]'>
//       <Footer />
//     </div>
    
//   </div>
// );

// }

// export default Popular

import React from 'react'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import MovieItem from './MovieItem'
import { BeatLoader } from 'react-spinners'

function Popular() {
  const jwtToken = Cookies.get('jwt_token')
  const [popularData, setPopularData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  function renderLoadingView() {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen bg-[#0f0f0f]'>
        <BeatLoader color="#D81F26" size={15} />
      </div>
    )
  }

  useEffect(() => {
    async function getPopularData() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      }
      const response = await fetch('https://apis.ccbp.in/movies-app/popular-movies', options)
      const data = await response.json()
      const formattedData = data.results.map(i => ({
        backDropPath: i.backdrop_path,
        id: i.id
      }))
      setPopularData(formattedData)
      setIsLoading(false)
    }
    getPopularData()
  }, [])

  return isLoading ? (
    renderLoadingView()
  ) : (
    <div className='bg-[#0f0f0f] min-h-screen pb-[30px]'>
      <Header />
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 sm:p-6 md:p-[40px]'>
        {popularData.map(i => (
          
            <MovieItem img={i.backDropPath} uniqueId={i.id} />
         
        ))}
      </div>
      <div className='mt-10 sm:mt-[60px] md:mt-[80px]'>
        <Footer />
      </div>
    </div>
  );
}

export default Popular
