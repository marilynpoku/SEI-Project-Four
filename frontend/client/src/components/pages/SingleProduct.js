import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductCarousel from '../utilities/SingleProduct/ProductCarousel'
import { useParams} from 'react-router-dom'
import { Container, Heading, Stat, StatNumber} from '@chakra-ui/react'
import  Button from 'react-bootstrap/Button'

import { BsBagDashFill } from "react-icons/bs";
<BsBagDashFill/>



const SingleProduct = () => {

    const [productData, setproductData] = useState('')
    // const [brandData, setBrandData] = useState([])
    const {id } = useParams()


    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`)
                console.log('data ->', data)
                setproductData(data)
                console.log('review data ->', productData.reviews)
            } catch (error) {
                console.log('error ->', error)
            }
        }
        getData()
    }, [id])


    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const { data } = await axios.get(`/api/brand/${id}`)
    //             console.log('data ->', data)
    //             setBrandData(data)
    //         } catch (error) {
    //             console.log('error ->', error)
    //         }
    //     }
    //     getData()
    // }, [id])

    return (
        <>
            <ProductCarousel productData={productData}/>
            <Container className='produdct-details'>
                <Heading as='h2' size='xl'>{productData.name}</Heading>
                {/* <Link className='product-link' to={`/brand/${brandData.id}`}> */}
                    <Heading as='h5' size='sm'>{productData.brand}</Heading>
                {/* </Link> */}
                <Heading as='h6' size='xs'>Product Details</Heading>
                <p>{productData.product_details}</p>
                <Stat>
                    <StatNumber>£{productData.price}</StatNumber>
                </Stat>
            </Container>
            <Button className='btn btn-dark' size='sm'> Add</Button>
            <Container className ='review-text'>
                {/* {productData.reviews && 
                productData.reviews((review, i ) => {
                    return (
                        <p>Created by {review.owner}</p>
                    )
                })
                } */}
            </Container>
            
        </>
    )
}

export default SingleProduct

