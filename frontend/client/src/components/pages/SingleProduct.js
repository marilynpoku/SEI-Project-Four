import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductCarousel from '../utilities/ProductCarousel'
import { useParams} from 'react-router-dom'
import ReviewForm from '../utilities/ReviewForm'
// import Basket from '../utilities/Basket'


// Layout and styling imports
import { Container, Heading, Stat, StatNumber, Text, Box, Divider } from '@chakra-ui/react'
import  Button from 'react-bootstrap/Button'
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
                <Heading as='h2' size='xl' mx={30}>{productData.name} </Heading>
                <Box ml={330}><BsHeartFill className='m-30' mx={30}/> {productData.likes}</Box>
                    <Heading as='h5' size='sm' mx={30}>{productData.brand}</Heading>
                <Heading as='h6' size='xs' mx={30} >Product Details</Heading>
                <Text size='sm' fontSize='15px' textAlign='justify' mx={30} my={30}>{productData.product_details}</Text>
                <Stat>
                <StatNumber mx={30} fontSize='15px' >£{productData.price}</StatNumber>
                </Stat>
            </Container>
            <Container className='button-container'>
                <Button onClick={addToBasket} className='btn btn-dark' size='sm'><BsBagDashFill/>  Add</Button>
                <Button className='btn btn-dark'>Go to basket ({basket.length})</Button>
            </Container>
            {productData && (
            <Container className='reviews-container' border={'1px solid white'} bg={'whitesmoke'}>
                <Heading mt={25} className='text-center' as='h4' size='md'>Reviews ({productData.reviews.length})</Heading>
                <ReviewForm id={id} refreshData={getData} review={review} setReview={setReview}/>
                {productData.reviews.map((review, i ) => {
                    return (
                        <Box  my={30} mx={30} key={i}>
                            <Text>{review.owner.username}</Text>
                            <Text>{review.text}</Text>
                            <Divider/>
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

