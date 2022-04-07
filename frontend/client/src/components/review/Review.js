import React  from 'react'
import axios from 'axios'
import { getPayload, getTokenFromLocalStorage } from '../auth/helpers'

// Layout and styling imports
import { Text, Box, Divider } from '@chakra-ui/react'
import Button from 'react-bootstrap/Button'



const Review = ({ review, refreshData }) => {

    
    const userIsOwner = () => {
        const payload = getPayload()
        if (!payload) return
        return review.owner.id === payload.sub
    }


    // Delete a review 
    const deleteReview = async () => {
        try {
            await axios.delete(`/api//reviews/${review.id}`, {
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`
                }
            }
            )
            refreshData()
        } catch (error) {
            console.log(error.response.data.detail)
        }
    }   



    return (
        <>
                    <Box my={30} mx={30}>
                        <Text>{review.owner.username}</Text>
                        <Text>{review.text}</Text>
                        {userIsOwner() &&
                            <>
                                <Button className='btn btn-dark' onClick={deleteReview}>Delete</Button>
                            </>
                        }
                        <Divider />
                    </Box>
        </>
    )
}


export default Review 