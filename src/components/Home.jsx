import React from 'react'
import Header from './Header'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import Slider from "react-slick";
import Cookies from 'js-cookie';
import Footer from './Footer';
import { BeatLoader } from 'react-spinners';
import MovieItem from './MovieItem';

function Home() {
  const [trendingNowData,setTrendingNowData] = useState([])
  const [originalsData, setOriginalsData] = useState([])
  const [isLoadingTrendingData, setIsLoadingTrendingData] = useState(true)
  const [isLoadingOriginalsData, setIsOriginalsData] = useState(true)
  const jwtToken = Cookies.get('jwt_token')
  useEffect(() => {
    const getTrendingNowData = async () => {
        const options = {
            method : "GET",
            headers : {
                Authorization : `Bearer ${jwtToken}`
            }
        }
        const response = await fetch('https://apis.ccbp.in/movies-app/trending-movies',options)
        const data = await response.json()
        const formattedData = data.results.map(each => ({
            backdropPath : each.backdrop_path,
            id : each.id,
            posterPath : each.poster_path,
            title : each.title
        }))
        setTrendingNowData(formattedData)
        setIsLoadingTrendingData(false)
    }
    getTrendingNowData()
  },[])

  useEffect(() => {
    const getOriginalsData = async () => {
        const options = {
            method : "GET",
            headers : {
                Authorization : `Bearer ${jwtToken}`
            }
        }
        const response = await fetch('https://apis.ccbp.in/movies-app/originals',options)
        const data = await response.json()
        const formattedData = data.results.map(each => ({
            backdropPath : each.backdrop_path,
            id : each.id,
            posterPath : each.poster_path,
            title : each.title
        }))
        setOriginalsData(formattedData)
        setIsOriginalsData(false)
    }
    getOriginalsData()
  },[])

  function renderLoadingView() {
    <div className='flex flex-col justify-center items-center h-[200px]'>
        <BeatLoader color="#D81F26" size={15}/>
    </div>
  }

  const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4, 
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};


  return (
    <>
        <div
        className='relative bg-[url("https://res.cloudinary.com/dndcaj4r2/image/upload/v1753980490/418e5ab72e7c52e74cd14b44129a625a520a8448_c5vqqb.jpg")] bg-cover bg-center h-[70vh] w-full'
        >
        <Header />
        <div className='pt-70 pl-35'>
            <h1 className='text-white text-[55px] text-bold'>Super Man</h1>
            <p className='text-white text-xl w-[400px]'>Superman is a fictional superhero who first appeared in American comic books published by DC Comics.</p>
            <button className='bg-white p-2 pl-5 pr-5 rounded-md mt-5'>Play</button>
        </div>
        </div>
        <div className='bg-[#0f0f0f] p-[40px]'>
          <p className='text-white text-[30px] text-[10px] pb-5'>Trending Now</p>
          {isLoadingTrendingData ? renderLoadingView() :   <Slider {...settings}>
            {trendingNowData.map(i => <MovieItem img={i.backdropPath} uniqueId={i.id}/>)}
          </Slider>}
        
          <p className='text-white text-[30px] text-[10px] pb-5 pt-5'>Originals</p>
          {isLoadingOriginalsData ? renderLoadingView() : <Slider {...settings}>
            {originalsData.map(i => <MovieItem img={i.backdropPath} uniqueId={i.id}/>)}
          </Slider>}
          
          <Footer/>
        </div>
    </>
   
  //  <div><img src={i.backdropPath} className='h-[200px]'/></div>
  )
}

export default Home
