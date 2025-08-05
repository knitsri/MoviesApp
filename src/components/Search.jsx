import React from 'react'
import Header from './Header'
import { useState } from 'react';
import Cookies from 'js-cookie';
import { BeatLoader } from 'react-spinners';
import MovieItem from './MovieItem';

function Search() {
 const jwtToken = Cookies.get('jwt_token')
 const [searchValue, setSearchValue] = useState("");
 const [searchResults,setSearchResults] = useState([])
 const [isLoading,setIsLoading] = useState(false)
 const [searchCompleted, setIsSearchCompleted] = useState(false)
 const [searchedValue, setSearchedValue] = useState('')
 const onChange = (e) => {
     setSearchValue(e.target.value)
 }

 function renderLoadingView() {
     return(
       <div className='flex flex-col justify-center items-center min-h-screen bg-[#0f0f0f]'>
         <BeatLoader color="#D81F26" size={15}/>
       </div>
     )
    }

 function noSearchResults() {
    return(
        <div className='h-[100vh] bg-[#0f0f0f] flex flex-col justify-center items-center'>
            <img src="https://res.cloudinary.com/dndcaj4r2/image/upload/v1754100549/Group_7394_pkfc3z.png" className='w-[250px] md:w-[400px]'/>
            <h1 className='text-white pt-5'>{`Your search for ${searchedValue} did not find any matches.`}</h1>
        </div>
    )
 }

 
 const onClickSearch = async () => {
          if(searchValue === "") {
            return;
          }
          setIsLoading(true)
          const url = `https://apis.ccbp.in/movies-app/movies-search?search=${encodeURIComponent(searchValue)}`
          const options = {
            method : "GET",
            headers : {
                Authorization : `Bearer ${jwtToken}`
            }
          }
          const response  = await  fetch(url,options)
          const data = await response.json()
          const formattedData = data.results.map(i => ({
            backdropPath : i.backdrop_path,
            id : i.id ,
            title : i.title 
          }))
          setSearchResults(formattedData)
          setIsLoading(false)
          setIsSearchCompleted(true)
          setSearchedValue(searchValue)
          setSearchValue("")
 }

  return  isLoading ? renderLoadingView() : (
    <div className='bg-[#0f0f0f] min-h-screen'>
      <Header searchValue={searchValue} onChange={onChange} onClickSearch={onClickSearch}/>
      {searchResults.length == 0  && searchCompleted? (noSearchResults()) : ( <div className='p-[40px]  mt-5 grid  grid-cols-2 md:grid-cols-4 gap-5'>
      {searchResults.map(i => <MovieItem img={i.backdropPath} uniqueId={i.id}/>)}
      </div>)}
     
    </div>
  )
}

export default Search
