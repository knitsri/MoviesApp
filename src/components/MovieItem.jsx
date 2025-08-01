import React from 'react'
import { Link } from 'react-router'
{/* <div><img src={i.backdropPath} className='h-[200px]'/></div> */}
{/* <img src={i.backDropPath} className='rounded-lg'/> */}
function MovieItem(props) {
  const {img,uniqueId} = props 

  return (
    <Link to={`/movies/${uniqueId}`}>
       <div>
         <img src={img} className='h-[200px]'/>
       </div>
    </Link>
  )
}

export default MovieItem
