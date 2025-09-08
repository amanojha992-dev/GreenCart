import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
    const { products, searchQuery ,setSearchQuery} = useAppContext()
    const [filteredProduct, setFilteredProduct]=useState([])
    useEffect(()=>{
        if(searchQuery.length>0)
        {
            setFilteredProduct( products.filter((product)=>product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
        else{
            setFilteredProduct(products)
        }

    },[searchQuery,products])

    return (
        <div className='mt-16 '>
            <div className="flex flex-col items-end w-max">
                <p className='text-2xl font-medium uppercase'>ALL PRODUCTS</p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
                {filteredProduct.filter((product) => product.inStock)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((product, index) => (
                        <ProductCard product={product} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default AllProducts