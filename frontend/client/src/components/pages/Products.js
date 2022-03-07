import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { SimpleGrid } from '@chakra-ui/react'



const Products = () => {

    const [productsData, setproductsData] = useState([])
    const [brandOptions, setBrandOptions] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filters, setFilters] = useState({brand: 'All', searchTerm:''})

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get('/api/products')
                console.log('data ->', data)
                setproductsData(data)
            } catch (error) {
                console.log('error ->', error)
            }
        } 
        getData()
    }, [])

    useEffect(()=> {
        
        const brandsList = []
        productsData.forEach(product => {
            brandsList.push(product.brand)
        })
        const brandsArr = [...new Set(brandsList)]
        setBrandOptions(brandsArr)
        console.log('brandlist', brandsList)

    }, [productsData])




    return (
        <>
        <section className='product-container'>

        </section>
        </>
    ) 
}

export default Products

