import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Cookies from 'js-cookie'
function MovieDetails() {
  const jwtToken = Cookies.get('jwt_token')
  const {id} = useParams()
  const url = `https://apis.ccbp.in/movies-app/movies/${id}`
  const [movieDetailsData,setMovieDetailsData] = useState({})
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
       const formattedData = data.movie_details.map(i => ({
           adult : i.adult,
           backdropPath : i.backdrop_path,
           budget : i.budget ,
           genres : i.genres ,
           id_ : i.id ,
           overview : i.overview,
           posterPath : i.poster_path,
           releaseDate : i.release_date,
           runtime : i.runtime,
           similarMovies : i.similar_movies,
           spokenLanguage : i.spoken_languages,
           title : i.title,
           ratingCount : i.vote_count,
           ratingAverage : i.vote_average,
       }))
       setMovieDetailsData(formattedData)
    }
    getMovieDetailsData()
  },[])
  const {adult,backdropPath,budget,genres,id_,overview,posterPath,releaseDate,runtime,similarMovies,spokenLanguage,title,ratingCount,ratingAverage} = movieDetailsData
  return (
    <>
      <div className='relative bg-[url({backdropPath})]>

      </div>
    </>
  )
}

export default MovieDetails
