import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import Footer from './components/Footer';
import Categories from './components/Categories';
import Category from './pages/Category';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import Seller from './components/seller/seller';
import SellerLayout from './pages/Seller/SellerLayout';
import AddProduct from './pages/Seller/AddProduct';
import ProductList from './pages/Seller/ProductList';
import Orders from './pages/Seller/Orders';
import Loading from './components/Loading';

const App = () => {
  const { showUserLogin, isSeller } = useAppContext();
  const isSellerPath = useLocation().pathname.includes("seller")
  return (
    <div className=''>
      {isSellerPath ? null : <Navbar></Navbar>}
      {showUserLogin ? <Login></Login> : null}
       <Toaster></Toaster> 
      <div className={`${(isSellerPath) ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<Category />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path="/loader"  element={<Loading/>} />
          <Route path='/seller' element={isSeller ? <SellerLayout/>: <Seller/>}>
             <Route index element={isSeller ? <AddProduct/>:null} />
             <Route path='product-list' element={<ProductList/>} />
             <Route path="Orders" element={<Orders/>} />
          </Route>

        </Routes>
      </div>
      {isSellerPath ? null : <Footer></Footer>}

    </div>
  )
}

export default App