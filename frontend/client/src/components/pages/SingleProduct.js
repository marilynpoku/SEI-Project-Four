import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductCarousel from '../utilities/SingleProduct/ProductCarousel'
import { useParams} from 'react-router-dom'
import ReviewForm from '../utilities/SingleProduct/ReviewForm'


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

    
    return (
        <>
            <ProductCarousel productData={productData}/>
            <Container className='produdct-details'>
                <Heading as='h2' size='xl'>{productData.name}</Heading>
                <BsHeartFill/>{productData.likes}
                {/* <Link className='product-link' to={`/brand/${brandData.id}`}> */}
                    <Heading as='h5' size='sm'>{productData.brand}</Heading>
                {/* </Link> */}
                <Heading as='h6' size='xs'>Product Details</Heading>
                <Text>{productData.product_details}</Text>
                <Stat>
                    <StatNumber>£{productData.price}</StatNumber>
                </Stat>
            </Container>
            <Button className='btn btn-dark' size='sm'> <BsBagDashFill/>Add</Button>
            {productData && (
            <Container className='review-text'>
                <Heading className='text-center' as='h4' size='md'>Reviews ({productData.reviews.length})</Heading>
                {productData.reviews.map((review, i ) => {
                    return (
                        <Box key={i}>
                            {/* <Image borderRadius='100%' height='40px'  src={review.owner.profile_image} /> */}
                            <Text>Submitted by: {review.owner.username}</Text>
                            <Text>{review.text} <span className='review-timestamp, text-muted'>{new Date(review.created_at).toLocaleString('uk')}</span></Text>
                        </Box>
                    )
                })
                }
            </Container>
            )
            }
            <ReviewForm id={id} refreshData={getData} review={review} setReview={setReview}/>
        </>
    )  
}

export default SingleProduct

