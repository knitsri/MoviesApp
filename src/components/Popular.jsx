import React from 'react'
import Cookies from 'js-cookie'
import { useState,useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import MovieItem from './MovieItem'

function Popular() {
  const jwtToken = Cookies.get('jwt_token')
  const [popularData,setPopularData] = useState([])
  useEffect(() => {
    async function getPopularData() {
      const options = {
        method : "GET" ,
        headers : {
          Authorization : `Bearer ${jwtToken}`
        }
      }
      const response = await fetch('https://apis.ccbp.in/movies-app/popular-movies',options)
      const data = await response.json()
      const formattedData = data.results.map(i => ({
        backDropPath : i.backdrop_path ,
        id : i.id
      }))
      setPopularData(formattedData)
    }
    getPopularData()
  },[])
  return (
    <div className='bg-[#0f0f0f]  min-h-screen pb-[30px]'>
      <Header/>
      <div className='grid grid-cols-4 gap-4 p-[40px]'>
        {popularData.map(i => <MovieItem img={i.backDropPath} uniqueId={i.id}/>)}
      </div>
      <Footer/>
    </div>
  )
}

export default Popular
