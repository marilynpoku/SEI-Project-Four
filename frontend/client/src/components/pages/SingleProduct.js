import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductCarousel from '../utilities/ProductCarousel'
import { useParams} from 'react-router-dom'
import ReviewForm from '../utilities/ReviewForm'
// import Basket from '../utilities/Basket'


// Layout and styling imports
import { Container, Heading, Stat, StatNumber, Text, Box, Image } from '@chakra-ui/react'
import  Button from 'react-bootstrap/Button'
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { BsBagDashFill } from "react-icons/bs";




const SingleProduct = () => {

    const [productData, setproductData] = useState('')
    const {id } = useParams()
    const [ review, setReview ] = useState({ text:'', product: `${id}`})
    const [basket, setBasket ] = useState([])

    // Get product data
    const getData = useCallback(async () =>  { 
        try {
            const { data } = await axios.get(`/api/products/${id}`)
            console.log('data ->', data)
            setproductData(data)
        } catch (error) {
            console.log('error ->', error)
        }
    },[id])

    useEffect(()=> {
        getData()
    },[getData, id])



    const getBasketFromLocalStorage = () => {
        window.localStorage.getItem('basket') 
    } 


    const addToBasket = () => {
        console.log('Add to basket function')
        console.log('basket', basket)
        console.log('productData',productData)
        setBasket([...basket, {...productData}])

    }

    useEffect(()=> {
        window.localStorage.setItem('basket', JSON.stringify(basket))
    },[basket])

    // const removeFromBasket = ( productToRemove ) => {
    //     setBasket(basket.filter((productData) => productData !== productToRemove)
    //     )
    // }


    
    return (
        <>
            <ProductCarousel productData={productData}/>
            <Container className='produdct-details'>
                <Heading as='h2' size='xl'>{productData.name}</Heading>
                <BsHeartFill/>{productData.likes}
                    <Heading as='h5' size='sm'>{productData.brand}</Heading>
                <Heading as='h6' size='xs'>Product Details</Heading>
                <Text>{productData.product_details}</Text>
                <Stat>
                    <StatNumber>£{productData.price}</StatNumber>
                </Stat>
            </Container>
            <Button onClick={addToBasket} className='btn btn-dark' size='sm'> <BsBagDashFill/>Add</Button>
            <Button className='btn btn-dark'>Go to basket ({basket.length})</Button>
            {productData && (
            <Container className='review-text'>
                <Heading className='text-center' as='h4' size='md'>Reviews ({productData.reviews.length})</Heading>
                <ReviewForm id={id} refreshData={getData} review={review} setReview={setReview}/>
                {productData.reviews.map((review, i ) => {
                    return (
                        <Box key={i}>
                            {/* <Image borderRadius='100%' height='40px'  src={review.owner.profile_image} /> */}
                            <Text>Posted by: {review.owner.username} <span className='review-timestamp, text-muted'>{new Date(review.created_at).toLocaleString('uk')}</span></Text>
                            <Text>{review.text}</Text>
                        </Box>
                    )
                })
                }
            </Container>
            )
            }
        </>
    )  
}

export default SingleProduct

