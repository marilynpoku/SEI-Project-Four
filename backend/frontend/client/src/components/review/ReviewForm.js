import React, { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getTokenFromLocalStorage, userIsAuthenticated } from '../auth/helpers'
import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'



const ReviewForm = ({ id, refreshData, review, setReview }) => {



    const [formErrors, setFormErrors] = useState('')

    // Post a review
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(getTokenFromLocalStorage())
        try {
            await axios.post(
                `/api/reviews/`,
                review,
                {
                    headers: {
                        Authorization: `Bearer ${getTokenFromLocalStorage()}`
                    },
                })
            refreshData()
            setReview({ text: '', product: `${id}` })
        } catch (error) {
            console.log(error)
            setFormErrors(error.response.data.detail)

        }
    }

    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value })
        console.log('review', review)
    }


    return (
        <>
            <Box display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                <Form>
                    {userIsAuthenticated() ?
                        <>
                            <Form.Group className='mb-3'>
                                <Form.Control onChange={handleChange} name='text' type='text' as='textarea' placeholder='Have your say...' value={review.text} />
                            </Form.Group>
                            <Form.Group className='text-center mt-4'>
                                <Button onClick={handleSubmit} type='submit' className='btn btn-secondary review-btn'>Post review</ Button>
                            </Form.Group>
                        </>
                        :
                        <Box mx={30}><Link className='login-link' to={`/login`}>Write a review</Link></Box>
                    }
                </Form>
            </Box>
        </>
    )
}

export default ReviewForm

