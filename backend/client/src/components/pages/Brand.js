import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heading, Text, Image } from '@chakra-ui/react'
import axios from 'axios'

const Brand = () => {


    const [brands, setBrands] = useState('')

    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`/api/brands/${id}/`)
                console.log('BRAND DATA', data)
                setBrands(data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [id])


    return (
        <section>
            <Heading size='lg' fontSize='50px' textAlign='center'>{brands.name}</Heading>
            <Image borderRadius='full' boxSize='100%' src={brands.logo} alt='brand logo' />



            <Text>Products Here</Text>

            {brands && (
                
                <>
                <Text>Products Here</Text>
                    {brands.related_products.map((product, index) => {
                        return (
                            <>
                                <Text key={index}>{product.name}</Text>
                                <Image src={product.image_right} alt='productImage' />
                            </>
                        )
                    })}

                <Text>Articles Here</Text>
                    {brands.related_articles.map((article, i) => {
                        return (
                            <>
                                <Text key={i}>{article.title}</Text>
                                <Text >{article.tagline}</Text>
                                <Image src={article.image} alt='articleImage' />
                            </>
                        )
                    })}
                </>

            )}
            {/* <Text>{brands.related_articles[1].product_details}</Text> */}

            {/* {filteredEvents.map((event) => {
                                return (
                                    <Marker
                                        key={event._id}
                                        longitude={event.longitude}
                                        latitude={event.latitude}
                                        onClick={() => setShowPopup()}
                                    ></Marker>
                                )
                            })} */}

            {/* <Text>{brands.related_products}</Text> */}
            {/* 
            {Object.keys(brands).forEach(function(item) {
                return (
                    <Text>{item.related_products.product_details}</Text>
                )
            })} */}




        </section>
    )
}

export default Brand

