
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieDetails from './components/MovieDetails' 
import Search from './components/Search'
import { BrowserRouter, Routes, Route } from 'react-router'
import Profile from './components/Profile'
import { AuthProvider } from './Context'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
    <BrowserRouter>
       <AuthProvider>
         <Routes>
        <Route path="/auth" element={<Login/> }/>
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
          }/>
        <Route path="/popular" element={
          <ProtectedRoute>
             <Popular/>
          </ProtectedRoute>
          }/>
        <Route path="/movies/:id" element={
          <ProtectedRoute>
             <MovieDetails/>
          </ProtectedRoute>
          }/>
        <Route path="/search" element={
          <ProtectedRoute>
             <Search/>
          </ProtectedRoute>
          }/>
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
          }/>
        <Route path="*" element={
          <ProtectedRoute>
              <NotFound/>
          </ProtectedRoute>
          }/>
       </Routes>
       </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
