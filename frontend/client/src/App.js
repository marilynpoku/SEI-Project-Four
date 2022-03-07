import React from 'react'
import { BrowserRouter as Routes, Route, BrowserRouter } from 'react-router-dom'


// Components
import NavBar from './components/common/Navbar'
import Home from './components/pages/Home'
import Products from './components/pages/Products'
import SingleProduct from './components/pages/SingleProduct'
import Brand from './components/pages/Brand'
import Article from './components/pages/Article'
import Profile from './components/pages/Profile'
import CreateArticle from './components/pages/CreateArticle'
import Login from './components/auth/Login'
import Register from './components/auth/Register'


function App() {

    return (
        <>
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/products/:id' element={<SingleProduct/>} />
        <Route path='/brand' element={<Brand/>} />
        <Route path='/article' element={<Article/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/createArticle' element={<CreateArticle/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        </Routes>
        <NavBar/>
        </BrowserRouter>
        </>
    )
}

export default App
