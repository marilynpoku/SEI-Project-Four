import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { SimpleGrid, Image, Box, Heading, Select } from '@chakra-ui/react'

const Products = () => {

    const [productsData, setproductsData] = useState([])
    const [brandOptions, setBrandOptions] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filters, setFilters] = useState({ brand: 'All brands', searchInput: '' })

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

    useEffect(() => {

        if (productsData.length) {
        
        const brandsList = [] 
        productsData.map(product => {
        brandsList.indexOf(product.brand) === -1 && brandsList.push(product.brand)
        })
        setBrandOptions(brandsList)
        console.log('brandlist', brandsList)
        }
        }, [productsData])

        
    const handleFilter = (e) => {
        const filterObj = { ...filters, [e.target.name]: e.target.value }
        console.log('e.target.value', e.target.value)
        console.log('e.target.name', e.target.name )
        setFilters(filterObj)
        }

    useEffect(() => {

        if (productsData.length) {
            
            const search = new RegExp(filters.searchInput, 'i')
            setFilteredProducts(productsData.filter(product => {

                return search.test(product.name) && (filters.brand === product.brand  || filters.brand === 'All brands')
            }))
        }
            }, [productsData, filters])
    
    return (
        <>
            <Heading as='h2' size='xl'>Feed</Heading>
            <Select onChange={handleFilter} name={'brand'} defaultValue={productsData.brand}>
                <option value='' defaultValue disabled> -- Select a brand -- </option>
                <option value='All brands'>All brands</option>
                {brandOptions && brandOptions.sort().map((brand, i) => <option key={i} value={brand}>{brand}</option> )}
            </Select>
            <input onChange={handleFilter} name={'searchInput'}  defaultValue={filters.searchInput}  placeholder='Search' type='text' size='sm' />
            <section className='product-container'>
                <SimpleGrid columns={2} spacing={4}>
                    {productsData &&
                    productsData.map((product, i) => {
                        return (
                            <Box key={i} > 
                                <span className='product-text'>{product.name}</span>
                                <Link className='product-link' to={`/products/${product.id}`}>
                                <Image src={product.image_right} alt={product.name} bg='black' height='180px' width='180px' />
                                </Link>
                            </Box>
                        )
                    })
                }
                </SimpleGrid>
            </section>
        </>
    )
}

export default Products

