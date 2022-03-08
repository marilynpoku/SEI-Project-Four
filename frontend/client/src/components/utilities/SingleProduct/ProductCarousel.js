import React from 'react'
import Carousel from 'react-bootstrap/Carousel'


const ProductCarousel = ({ productData }) => {

    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src={productData.image_left}
                        alt={productData.name}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src={productData.image_left}
                        alt={productData.name}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src={productData.image_top}
                        alt={productData.name}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src={productData.image_bottom}
                        alt= {productData.name}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src={productData.image_angle}
                        alt={productData.name}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='d-block w-100'
                        src={productData.image_angle_extra}
                        alt={productData.name}
                    />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default ProductCarousel

