import React from 'react'
import { Box, Container, Image} from '@chakra-ui/react'



const ProductGrid = ({ productData }) => {
    

    return (
        <>
        
            <div className='productGrid-container'>
                <Box><Image src={productData.image_left} width='380px' margin={4}></Image></Box>
                <Box><Image src={productData.image_right} width='380px' margin={4}></Image></Box>
                <Box><Image src={productData.image_top} width='380px' margin={4}></Image></Box>
                <Box><Image src={productData.image_bottom} width='380px' margin={4}></Image></Box>
                <Box><Image src={productData.image_angle} width='380px' margin={4}></Image></Box>
                <Box><Image src={productData.image_angle_extra} width='380px' margin={4}></Image></Box>
            </div>
        </>
    )
}

export default ProductGrid

