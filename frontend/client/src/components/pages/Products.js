import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Box, Heading, Select, Text, Stack } from '@chakra-ui/react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'


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
        
        const brandsList = [ ...new Set(productsData.map(product => product.brand))]
        setBrandOptions(brandsList)
        console.log('brandlist', brandsList)
        }
        }, [productsData])

        
    const handleFilter = (e) => {
        const filterObj = { ...filters, [e.target.name]: e.target.value }
        console.log('filter object', filterObj)
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
            <Heading className='text-center main-header' as='h2' size='xl'>FEED</Heading>
            <Form className='form'>
                <Stack spacing={4}>
                <Select className='brand-select' onChange={handleFilter} name={'brand'} defaultValue={productsData.brand} >
                    <option value='' defaultValue disabled> -- Select a brand -- </option>
                    <option value='All brands'>All brands</option>
                    {brandOptions && brandOptions.sort().map((brand, i) => <option key={i} value={brand}>{brand}</option> )}
                </Select>
                <input className='brand-search'onChange={handleFilter} name={'searchInput'}  defaultValue={filters.searchInput}  placeholder='Search' type='text' size='sm' />
                </Stack>
            </Form>
            <Container className='product-feed-container container-sm'>
                    {(filteredProducts.length ? filteredProducts : productsData).map((product, i) => {
                        return (
                                <Box key={i} className='card-container' style={{ width: '390px', height: '490px' }}>
                                    <Link className='product-link' to={`products/${product.id}`}>
                                        <Card.Img className='card-image' variant='top' src={product.image_right} alt={product.name} max-width='380px' height='380px' />
                                    </Link>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Text>£{product.price}</Text>
                                </Box>
                        )
                    })
                }
            </Container>
        </>
    )
}

export default Products

