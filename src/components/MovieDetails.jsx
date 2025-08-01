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
    return DateOfRelease.slice(0,4) ;
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
           budget : movieDetails.budget ,
           genres : movieDetails.genres ,
           id_ : movieDetails.id ,
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


  const {adult,backdropPath,budget,genres,id_,overview,posterPath,releaseDate,runtime,similarMovies,spokenLanguage,title,ratingCount,ratingAverage} = movieDetailsData
  return (
  <>
   {isLoading ? renderLoadingView() : 
      <> 
        <div
      className="relative bg-cover bg-center h-[70vh] w-full"
      style={{ backgroundImage: `url(${backdropPath})` }}
       >
      {/* Gradient overlay on left */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313b6] to-transparent"></div>
      <Header />
      {/* Text content positioned to left */}
      <div className="absolute top-1/2 left-10 transform -translate-y-1/2 max-w-[40%]">
        <h1 className="text-white text-3xl font-bold mb-4">{title}</h1>
        <div className='flex gap-4 text-white mb-5'>
          <p>{convertMinutesToHours(runtime)}</p>
          <p className='border border-white pl-2 pr-2'>{adult ? 'A' : 'U/A'}</p>
          <p>{convertToYear(releaseDate)}</p>
        </div>
        <p className="text-white text-md w-[550px]">{overview}</p>
        <button className='bg-white pl-5 pr-5 p-2 mt-5 rounded-md'>Play</button>
      </div>
    </div>
    <div className='bg-[#0f0f0f] p-[60px] text-white'>
      <div className='grid grid-cols-4  gap-2 mb-6'>
        <div>
          <p className='text-[#94A3B8] pb-3'>Genres</p>
          <ul className='list-none '>
            {genres.map((i) => <li key={i.id} className='pb-2'>{i.name}</li>)}
          </ul>
        </div>
        <div>
          <p className='text-[#94A3B8] pb-3'>Audio Available</p>
          <ul className='list-none'>
             {spokenLanguage.map((i) => <li key={i.id} className='pb-2'>{i.english_name}</li>)}
          </ul>
        </div>
        <div>
          <p className='text-[#94A3B8] pb-1' >Rating Count</p>
          <p className='pb-3'>{ratingCount}</p>
          <p className='text-[#94A3B8] pb-1'>Rating Average</p>
          <p className='pb-3'>{ratingAverage}</p>
        </div>
        <div>
          <p className='text-[#94A3B8] pb-1'>Budget</p>
          <p className='pb-3'>{budget}</p>
          <p className='text-[#94A3B8] pb-1'>Release Date</p>
          <p className='pb-3'>{releaseDate}</p>
        </div>
      </div>
      <p className='text-[23px] mb-3'>More Like This</p>
      <div className='grid grid-cols-4 gap-5 mb-10'>
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
