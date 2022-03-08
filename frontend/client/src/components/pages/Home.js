import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import { Heading, Container, Image, SimpleGrid, Box } from '@chakra-ui/react'

const Home = () => {

    const [ randomArticles, setRandomArticles ] = useState([])
    const [ productsData, setProductsData ] = useState([])
    const [ productDrops, setProductDrops] = useState([])



    // Generates three random articles
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get('/api/articles')
                console.log(' article data ->', data)

                let randomArticle = []
                while (randomArticle.length < 3) {
                    randomArticle.push((data[Math.floor(Math.random() * data.length)]))
                    randomArticle = [ ...new Set (randomArticle)]
                }
                setRandomArticles(randomArticle)
                console.log('random articles', randomArticles)
            } catch (error) {
                console.log('error ->', error)
            }
        }
        getData()
    }, [])


    // Get all products data 

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get('/api/products')
                console.log(' product data ->', data)
                setProductsData(data)
            } catch (error) {
                console.log('error ->', error)
            }
        }
        getData()
    }, [])

     // Latest drops

    
    useEffect(() => {

        if (productsData.length) {

            let  sortedProductsByDate = productsData.sort((a, b) =>  new Date(b.release_date) - new Date(a.release_date) )
            sortedProductsByDate = sortedProductsByDate.slice(0,10)
            setProductDrops(sortedProductsByDate)
            console.log('productDrops', productDrops)
        }
    }, [productsData])


    
    return (
        <>
            <Nav className='justify-content-end' >
                <Nav.Item>
                    <Nav.Link href='/products'>Feed</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Join Us</Nav.Link>
                </Nav.Item>
            </Nav>
            <Heading as='h1' size='4xl' isTruncated>OTISX</Heading>
            <Container>
                {randomArticles && 
                randomArticles.map((article, i) => {
                    return (
                        <Link key={i} className='article-link' to={`/articles/${article.id}`}>
                        <Image src={article.image} alt={article.name}  height='260px'  />
                        <h6 className='text-center'>ARTICLE</h6>
                        <h3 className='text-center'>{article.tagline}</h3>
                    </Link>
                    )
                })
                }
            </Container>
            <Heading className='text-center' as='h2' size='2xl'>Upcoming drops </Heading>
            
            <SimpleGrid columns={1} spacing={4}>
                    {productDrops && 
                    productDrops.map((product, i) => {
                        return (
                            <Box key={i} > 
                                <Link className='product-link' to={`/products/${product.id}`}>
                                <span className='product-text text-center'>{product.name}</span>
                                <br/>
                                <span className='product-text text-center'> Draw opens {product.release_date}</span>
                                <Image src={product.image_right} alt={product.name} bg='black' height='360px' width='360px' />
                                </Link>
                            </Box>
                        )
                    })
                }
                </SimpleGrid>
        </>
    )
}

export default Home

