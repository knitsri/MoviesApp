
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieDetails from './components/MovieDetails' 
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {
  return (
    <>
    <BrowserRouter>
       <Routes>
        <Route path="/auth" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/popular" element={<Popular/>}/>
        <Route path="/movies/:id" element={<MovieDetails/>}/>
       </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
