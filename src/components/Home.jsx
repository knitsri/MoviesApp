
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
  const [isLoadingOriginalsData, setIsLoadingOriginalsData] = useState(true)
  const [isTrendingNowDataFailed,setIsTrendingNowDataFailed] = useState(false)
  const [isOriginalsDataFailed,setIsOriginalsDataFailed] = useState(false)
  const jwtToken = Cookies.get('jwt_token')

  function renderTrendingsDataView() {
    if(isLoadingTrendingData){
      return renderLoadingView()
    }
    else if(isTrendingNowDataFailed){
      return onSubmitFailureOfTrendingData()
    }
    else{
      return(
         <Slider {...settings}>
            {trendingNowData.map(i => <MovieItem img={i.backdropPath} uniqueId={i.id}/>)}
          </Slider>
      )
    }
  }

  function renderOriginalsDataView(){
    if(isLoadingOriginalsData){
      return renderLoadingView()
    }
    else if(isOriginalsDataFailed){
      return onSubmitFailureOfOriginalsData()
    }
    else{
      return(
         <Slider {...settings}>
            {originalsData.map(i => <MovieItem img={i.backdropPath} uniqueId={i.id}/>)}
          </Slider>
      )
    }
  }

  function onSubmitSuccessOfTrendingData(data) {
        const formattedData = data.results.map(each => ({
            backdropPath : each.backdrop_path,
            id : each.id,
            posterPath : each.poster_path,
            title : each.title
        }))
        setTrendingNowData(formattedData)
        setIsLoadingTrendingData(false)
  }

  function onSubmitFailureOfTrendingData() {
     return(
      <div className='bg-[#181818] p-[20px]  flex flex-col justify-center items-center gap-3'>
        <img src="https://res.cloudinary.com/dndcaj4r2/image/upload/v1754303053/alert-triangle_fiz3bu.png"/>
         <p className='text-white'>Something went wrong. Please try again</p>
         <button onClick={getTrendingNowData} className='bg-white pl-2 pr-2 p-2 rounded-md'>Try Again</button>
      </div>
     )
  }

  function onSubmitSuccessOfOriginalsData(data){
       const formattedData = data.results.map(each => ({
        backdropPath : each.backdrop_path,
        id : each.id,
        posterPath : each.poster_path,
        title : each.title
        }))
        setOriginalsData(formattedData)
        setIsLoadingOriginalsData(false)
  }

  function onSubmitFailureOfOriginalsData() {
    return(
      <div className='bg-[#181818] p-[20px]  flex flex-col justify-center items-center gap-3'>
        <img src="https://res.cloudinary.com/dndcaj4r2/image/upload/v1754303053/alert-triangle_fiz3bu.png"/>
         <p className='text-white'>Something went wrong. Please try again</p>
         <button onClick={getOriginalsData} className='bg-white pl-2 pr-2 p-2 rounded-md'>Try Again</button>
      </div>
     )
  }

    const getTrendingNowData = async () => {
        setIsLoadingTrendingData(true)
        const options = {
            method : "GET",
            headers : {
                Authorization : `Bearer ${jwtToken}`
            }
        }
        try{
          const response = await fetch('https://apis.ccbp.in/movies-app/trending-movies',options)
          if(response.ok){
          const data = await response.json()
          onSubmitSuccessOfTrendingData(data)
          }
          else {
              setIsTrendingNowDataFailed(true)
              setIsLoadingTrendingData(false)
           }
        }
        
        catch{
          setIsLoadingTrendingData(false)
          setIsTrendingNowDataFailed(true)
        }
    }

    const getOriginalsData = async () => {
      setIsLoadingOriginalsData(true)
    const options = {
        method : "GET",
        headers : {
            Authorization : `Bearer ${jwtToken}`
        }
    }
    try{
        const response = await fetch('https://apis.ccbp.in/movies-app/originals',options)
        if(response.ok){
           const data = await response.json()
           onSubmitSuccessOfOriginalsData(data)
        }
        else {
              setIsTrendingNowDataFailed(true)
              setIsLoadingTrendingData(false)
           }

    }
    catch{
      setIsLoadingOriginalsData(false)
      setIsOriginalsDataFailed(true)
    }
  
}

  useEffect(() => {
    getTrendingNowData()
  },[])


  useEffect(() => {
    getOriginalsData()
  },[])

  function renderLoadingView() {
    return(
      <div className='flex flex-col justify-center items-center h-[200px]'>
        <BeatLoader color="#D81F26" size={15}/>
      </div>
    )
    
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0f0f0f]">
      <div
        className='relative bg-[url("https://res.cloudinary.com/dndcaj4r2/image/upload/v1753980490/418e5ab72e7c52e74cd14b44129a625a520a8448_c5vqqb.jpg")] bg-cover bg-center h-[70vh] w-full'
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Header />
        <div className='pt-[230px] pl-[30px] md:pt-[20vh] md:pl-[8vw]'>
          <h1 className='text-white text-[24px] md:text-[55px] font-bold'>Super Man</h1>
          <p className='text-white text-[14px] md:text-xl w-[80vw] md:w-[400px]'>Superman is a fictional superhero who first appeared in American comic books published by DC Comics.</p>
          <button className='bg-white p-2 pl-5 pr-5 rounded-md mt-5 text-[12px] md:text-base hover:opacity-80 transition-opacity'>Play</button>
        </div>
      </div>
      <div className='p-[20px] md:p-[40px] max-w-[100vw]'>
        <p className='text-white text-[20px] md:text-[30px] pb-5'>Trending Now</p>
        {renderTrendingsDataView()}
        <p className='text-white text-[20px] md:text-[30px] pb-5 pt-5'>Originals</p>
        {renderOriginalsDataView()}
        <div className='mt-[50px] md:mt-[100px]'>
          <Footer/>
        </div>
      </div>
    </div>
  )
}

export default Home
