// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router'
// import Cookies from 'js-cookie'
// import Header from './Header'
// import { BeatLoader } from 'react-spinners'
// import MovieItem from './MovieItem'
// import Footer from './Footer'

// function MovieDetails() {
//   const jwtToken = Cookies.get('jwt_token')
//   const {id} = useParams()
//   const url = `https://apis.ccbp.in/movies-app/movies/${id}`
//   const [movieDetailsData,setMovieDetailsData] = useState({})
//   const [similarMoviesData, setSimilarMoviesData] = useState([])
//   const [isLoading,setIsLoading] = useState(true)
  
//   const convertToYear = (DateOfRelease) => {
//     return DateOfRelease.slice(0,4) ;
//   }

//    const convertMinutesToHours = (mins) => {
//         const hours = Math.floor(mins / 60);
//         const minutes = mins % 60;
//          return `${hours}h ${minutes}m`;
//     }

//     function renderLoadingView() {
//       return(
//           <div className='flex flex-col justify-center items-center min-h-screen bg-[#0f0f0f]'>
//             <BeatLoader color="#D81F26" size={15}/>
//           </div>
//       )
//       }

//   useEffect(() => {
//     async function getMovieDetailsData() {
//       const options = {
//         method : "GET",
//         headers : {
//           Authorization : `Bearer ${jwtToken}`
//         }
//       }
//        const response = await fetch(url,options)
//        const data = await response.json()
//        const movieDetails = data.movie_details
//        const formattedData = {
//            adult : movieDetails.adult,
//            backdropPath : movieDetails.backdrop_path,
//            budget : movieDetails.budget ,
//            genres : movieDetails.genres ,
//            id_ : movieDetails.id ,
//            overview : movieDetails.overview,
//            posterPath : movieDetails.poster_path,
//            releaseDate : movieDetails.release_date,
//            runtime : movieDetails.runtime,
//            similarMovies : movieDetails.similar_movies,
//            spokenLanguage : movieDetails.spoken_languages,
//            title : movieDetails.title,
//            ratingCount : movieDetails.vote_count,
//            ratingAverage : movieDetails.vote_average,
//        }
//        setMovieDetailsData(formattedData)
//        const similiarFormattedData = (movieDetails.similar_movies || []).map(i => ({
//           backdropPath: i.backdrop_path || '',
//           id: i.id || ''
//         }))
        
//         setSimilarMoviesData(similiarFormattedData)
//        setIsLoading(false)
//     }
//     getMovieDetailsData()
//   },[id])


//   const {adult,backdropPath,budget,genres,overview,releaseDate,runtime,spokenLanguage,title,ratingCount,ratingAverage} = movieDetailsData
//   return (
//   <>
//    {isLoading ? renderLoadingView() : 
//       <> 
//         <div
//       className="relative bg-cover bg-center h-[70vh] w-full"
//       style={{ backgroundImage: `url(${backdropPath})` }}
//        >
//       {/* Gradient overlay on left */}
//       <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313b6] to-transparent"></div>
//       <Header />
//       {/* Text content positioned to left */}
//       <div className="absolute top-1/2 left-10 transform -translate-y-1/2 max-w-[40%]">
//         <h1 className="text-white text-3xl font-bold mb-4">{title}</h1>
//         <div className='flex gap-4 text-white mb-5'>
//           <p>{convertMinutesToHours(runtime)}</p>
//           <p className='border border-white pl-2 pr-2'>{adult ? 'A' : 'U/A'}</p>
//           <p>{convertToYear(releaseDate)}</p>
//         </div>
//         <p className="text-white text-md w-[550px]">{overview}</p>
//         <button className='bg-white pl-5 pr-5 p-2 mt-5 rounded-md'>Play</button>
//       </div>
//     </div>
//     <div className='bg-[#0f0f0f] p-[60px] text-white'>
//       <div className='grid grid-cols-4  gap-2 mb-6'>
//         <div>
//           <p className='text-[#94A3B8] pb-3'>Genres</p>
//           <ul className='list-none '>
//             {genres.map((i) => <li key={i.id} className='pb-2'>{i.name}</li>)}
//           </ul>
//         </div>
//         <div>
//           <p className='text-[#94A3B8] pb-3'>Audio Available</p>
//           <ul className='list-none'>
//              {spokenLanguage.map((i) => <li key={i.id} className='pb-2'>{i.english_name}</li>)}
//           </ul>
//         </div>
//         <div>
//           <p className='text-[#94A3B8] pb-1' >Rating Count</p>
//           <p className='pb-3'>{ratingCount}</p>
//           <p className='text-[#94A3B8] pb-1'>Rating Average</p>
//           <p className='pb-3'>{ratingAverage}</p>
//         </div>
//         <div>
//           <p className='text-[#94A3B8] pb-1'>Budget</p>
//           <p className='pb-3'>{budget}</p>
//           <p className='text-[#94A3B8] pb-1'>Release Date</p>
//           <p className='pb-3'>{releaseDate}</p>
//         </div>
//       </div>
//       <p className='text-[23px] mb-3'>More Like This</p>
//       <div className='grid grid-cols-4 gap-5 mb-10'>
//         {similarMoviesData.map(i => <MovieItem key={i.id} img={i.backdropPath} uniqueId={i.id}/>)}
//       </div>
//       <Footer/>
//     </div>
//       </>
//    }
//   </> 
// )
// }

// export default MovieDetails

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Cookies from 'js-cookie'
import Header from './Header'
import { BeatLoader } from 'react-spinners'
import MovieItem from './MovieItem'
import Footer from './Footer'

function MovieDetails() {
  const jwtToken = Cookies.get('jwt_token')
  const {id} = useParams()
  const url = `https://apis.ccbp.in/movies-app/movies/${id}`
  const [movieDetailsData,setMovieDetailsData] = useState({})
  const [similarMoviesData, setSimilarMoviesData] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  
  const convertToYear = (DateOfRelease) => {
    return DateOfRelease?.slice(0,4) || '';
  }

  const convertMinutesToHours = (mins) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}m`;
  }

  function renderLoadingView() {
    return(
      <div className='flex flex-col justify-center items-center min-h-screen bg-[#0f0f0f]'>
        <BeatLoader color="#D81F26" size={15}/>
      </div>
    )
  }

  useEffect(() => {
    async function getMovieDetailsData() {
      const options = {
        method : "GET",
        headers : {
          Authorization : `Bearer ${jwtToken}`
        }
      }
      const response = await fetch(url,options)
      const data = await response.json()
      const movieDetails = data.movie_details
      const formattedData = {
        adult : movieDetails.adult,
        backdropPath : movieDetails.backdrop_path,
        budget : movieDetails.budget,
        genres : movieDetails.genres,
        id_ : movieDetails.id,
        overview : movieDetails.overview,
        posterPath : movieDetails.poster_path,
        releaseDate : movieDetails.release_date,
        runtime : movieDetails.runtime,
        similarMovies : movieDetails.similar_movies,
        spokenLanguage : movieDetails.spoken_languages,
        title : movieDetails.title,
        ratingCount : movieDetails.vote_count,
        ratingAverage : movieDetails.vote_average,
      }
      setMovieDetailsData(formattedData)
      const similiarFormattedData = (movieDetails.similar_movies || []).map(i => ({
        backdropPath: i.backdrop_path || '',
        id: i.id || ''
      }))
      
      setSimilarMoviesData(similiarFormattedData)
      setIsLoading(false)
    }
    getMovieDetailsData()
  },[id])


  const {adult,backdropPath,budget,genres,overview,releaseDate,runtime,spokenLanguage,title,ratingCount,ratingAverage} = movieDetailsData
  return (
    <>
      {isLoading ? renderLoadingView() : 
        <> 
          <div
            className="relative bg-cover bg-center h-[40vh] sm:h-[50vh] md:h-[70vh] w-full"
            style={{ backgroundImage: `url(${backdropPath})` }}
          >
            {/* Gradient overlay on left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313b6] to-transparent"></div>
            <Header />
            {/* Text content positioned to left */}
            <div className="absolute bottom-0 left-0 p-4 md:top-1/2 md:left-10 md:transform md:-translate-y-1/2 md:max-w-[40%] w-full">
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">{title}</h1>
              <div className='flex gap-2 sm:gap-3 md:gap-4 text-white mb-3 sm:mb-4 md:mb-5 flex-wrap'>
                <p className='text-sm sm:text-base'>{convertMinutesToHours(runtime)}</p>
                <p className='border border-white pl-1 pr-1 sm:pl-2 sm:pr-2 text-sm sm:text-base'>{adult ? 'A' : 'U/A'}</p>
                <p className='text-sm sm:text-base'>{convertToYear(releaseDate)}</p>
              </div>
              <p className="text-white text-xs sm:text-sm md:text-md w-full md:w-[550px] line-clamp-3 sm:line-clamp-none">{overview}</p>
              <button className='bg-white pl-3 pr-3 p-1 sm:pl-4 sm:pr-4 sm:p-2 md:pl-5 md:pr-5 md:p-2 mt-3 sm:mt-4 md:mt-5 rounded-md text-xs sm:text-sm md:text-base'>Play</button>
            </div>
          </div>
          <div className='bg-[#0f0f0f] p-4 sm:p-6 md:p-[60px] text-white'>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-3 md:gap-2 mb-6'>
              <div>
                <p className='text-[#94A3B8] pb-2 sm:pb-3 text-sm sm:text-base'>Genres</p>
                <ul className='list-none'>
                  {genres?.map((i) => <li key={i.id} className='pb-1 sm:pb-2 text-sm sm:text-base'>{i.name}</li>)}
                </ul>
              </div>
              <div>
                <p className='text-[#94A3B8] pb-2 sm:pb-3 text-sm sm:text-base'>Audio Available</p>
                <ul className='list-none'>
                  {spokenLanguage?.map((i) => <li key={i.id} className='pb-1 sm:pb-2 text-sm sm:text-base'>{i.english_name}</li>)}
                </ul>
              </div>
              <div>
                <p className='text-[#94A3B8] pb-1 text-sm sm:text-base'>Rating Count</p>
                <p className='pb-2 sm:pb-3 text-sm sm:text-base'>{ratingCount}</p>
                <p className='text-[#94A3B8] pb-1 text-sm sm:text-base'>Rating Average</p>
                <p className='pb-2 sm:pb-3 text-sm sm:text-base'>{ratingAverage}</p>
              </div>
              <div>
                <p className='text-[#94A3B8] pb-1 text-sm sm:text-base'>Budget</p>
                <p className='pb-2 sm:pb-3 text-sm sm:text-base'>{budget}</p>
                <p className='text-[#94A3B8] pb-1 text-sm sm:text-base'>Release Date</p>
                <p className='pb-2 sm:pb-3 text-sm sm:text-base'>{releaseDate}</p>
              </div>
            </div>
            <p className='text-lg sm:text-xl md:text-[23px] mb-3'>More Like This</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10'>
              {similarMoviesData.map(i => <MovieItem key={i.id} img={i.backdropPath} uniqueId={i.id}/>)}
            </div>
            <Footer/>
          </div>
        </>
      }
    </> 
  )
}

export default MovieDetails
