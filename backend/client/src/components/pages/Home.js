import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Heading, Image, Box, Text, Container } from '@chakra-ui/react'
import Card from 'react-bootstrap/Card'


const Home = () => {

    const [randomArticles, setRandomArticles] = useState([])
    const [productsData, setProductsData] = useState([])
    const [productDrops, setProductDrops] = useState([])

 

    // Generates two random articles
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get('/api/articles/')
                console.log(' article data ->', data)

                let randomArticle = []
                while (randomArticle.length < 2) {
                    randomArticle.push((data[Math.floor(Math.random() * data.length)]))
                    randomArticle = [...new Set(randomArticle)]
                }
                setRandomArticles(randomArticle)
                console.log('random articles', randomArticles)
            } catch (error) {
                console.log('error ->', error)
            }
        }
        getData()
    }, [])


    // Gets all products data 
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get('/api/products/')
                console.log(' product data ->', data)
                setProductsData(data)
            } catch (error) {
                console.log('error ->', error)
            }
        }
        getData()
    }, [])

    // Latest drops section
    useEffect(() => {

        if (productsData.length) {

            let sortedProductsByDate = productsData.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            sortedProductsByDate = sortedProductsByDate.slice(0, 10)
            setProductDrops(sortedProductsByDate)
            console.log('productDrops', productDrops)
        }
    }, [productsData])



    return (
        <>  
            <Container display='flex' flexDir={{base: 'column', md: 'row'}} flexWrap='wrap' justifyContent='center' alignItems='center' >
                {randomArticles &&
                    randomArticles.map((article, i) => {
                        return (
                            <Box display='flex' flexDir='column' justifyContent='center' alignItems='center' maxWidth='700px' maxHeight='700px' margin='2px' key={i}>
                            <Link className='article-link' to={`/article/${article.id}`}>
                                <Image borderRadius='full' boxSize='100%' display='block' objectFit='cover' objectPosition='top' src={article.image} alt={article.name} maxWidth='700px' maxHeight='467px' />
                                <Text fontSize='16px' textAlign='center'>ARTICLE</Text>
                                <Text fontSize='23px' textAlign='center' >{article.tagline}</Text>
                            </Link>
                            </Box>
                        )
                    })
                }
            </Container>

            <Heading className='text-center releases-heading' as='h2' size='3xl' mt='6vh' isTruncated>NEW RELEASES </Heading>
            <Text textAlign='center' mb='4vh'> The latest new releases all sneaker heads should look out for.</Text>

            <Container display='flex' flexWrap='wrap' justifyContent='center' alignItems='center' width='100%' margin='0 auto'>
                    {productDrops &&
                        productDrops.map((product, i) => {
                            return (
                                    <Box  key={i} className='card-container' style={{ width: '360px', height: '460px' }}>
                                        <Link className='product-link' to={`products/${product.id}`}>
                                            <Card.Img className='card-image ' variant='top' src={product.image_right} alt={product.name} max-width='350px' height='350px' />
                                        </Link>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Text>Draw opens: {new Date(product.release_date).toLocaleString('uk')}</Text>
                                            <Text>£{product.price}</Text>
                                    </Box>
                            )
                        })
                    }
            </Container>
        </>
    )
}

export default Home

