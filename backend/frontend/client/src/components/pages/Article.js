import React, { useEffect, useState } from 'react'
import { getPayload, getTokenFromLocalStorage } from '../auth/helpers.js'
import { useParams } from 'react-router-dom'
import { Heading, Text, Image, Box, Divider, Center, Container } from '@chakra-ui/react'

// import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { BsHeartFill } from "react-icons/bs";



// import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'

import axios from 'axios'

const Article = () => {

    const { id } = useParams()
    const [articles, setArticles] = useState('')
    const [comments, setComments] = useState({ text: '', articles: `${id}` })
    const [hasError, setHasError] = useState('')
    // const [likedBy, setLikedBy] = useState([])
    // const [hasLiked, setHasLiked] = useState(null)



    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`/api/articles/${id}`)
                console.log('article DATA', data)
                setArticles(data)
            } catch (error) {
                console.log(error.response.data.detail)
            }
        }
        getData()
    }, [id])

    const handleChange = (e) => {
        if (e.target) {
            const newObj = { ...comments, [e.target.name]: e.target.value }
            setComments(newObj)
        } else {
            console.log(e)
            const arrayOfValues = e.map((comments) => {
                return comments.owner.username
            })
            console.log(arrayOfValues)
            const newValue = { ...comments, text: arrayOfValues }
            setComments(newValue)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/comments/', comments, {
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
            setComments({ ...comments, text: '' })
            const getSingleArticles = async () => {
                try {
                    const { data } = await axios.get(`/api/articles/${id}`)
                    setArticles(data)
                } catch (err) {
                    setHasError(err.response.data.message)
                }
            }
            getSingleArticles()
        } catch (error) {
            console.log(error.response.data.detail)
        }
    }

    const ownerOfArticle = () => {
        const payload = getPayload()
        if (!payload) return
        return articles.owner.id === payload.sub
    }

    return (
        <Container display='flex' flexDir='column' justifyContent='center' alignItems='center'>
            <div className='article-page-container'>
                {/* NEED TO POPULATE ARTICLE, ARTICLE_LIKES, COMMENT & COMMENT_LIKES WITH OWNER INFO */}
                {articles && (
                    <>
                        <div className='article-content'>
                            {/* HEADLINE */}
                            <Heading size='lg' fontSize='25px' textAlign='center' mx={10} >{articles.title}</Heading>
                            {/* TAGLINE */}
                            <Text size='lg' fontSize='20px' textAlign='center' mx={10} mb={0}>{articles.tagline}</Text>
                            <Center height='50px'>
                                <Divider w='190px' />
                            </Center>
                            {/* ARTICLE IMAGE 1 */}
                            <Box display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                                <Image borderRadius='full' boxSize='100%' maxWidth='500px' objectFit='cover' objectPosition='center' src={articles.image} alt='article image 1' />
                            </Box>
                            {/* ARTICLE TEXT */}
                            <Text size='sm' fontSize='15px' textAlign='justify' mx={30} >{articles.text}</Text>
                            {/* ARTICLE IMAGE 2 */}
                            <Box display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                                <Image borderRadius='full' boxSize='100%'maxWidth='500px' objectFit='cover' objectPosition='center' src={articles.image_extra} alt='article image two' />
                            </Box>
                            {/* ARTICLE OWNER */}
                            <Text mx={30} size='sm' fontSize='15px' textAlign='justify' textColor={'grey'} > Written by: {articles.owner.username}</Text>
                            {ownerOfArticle() &&
                                <Button className='btn btn-dark'>Edit</Button>
                            }
                            {/* LIKE BUTTON */}
                            <Box mx={30}><BsHeartFill className='m-30' /> {articles.likes}</Box>
                        </div>


                        {/* Comment Submit */}
                        <div className='comments-container'>
                            {/* below: onSubmit={handleSubmit} */}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className='mx-2'>
                                    <Heading className='text-center' as='h4' size='md' mt='5vh'>Comments ({articles.comments.length})</Heading>
                                    {/* below: onChange={handleChange} */}
                                    <Form.Control
                                        name='text'
                                        type='text'
                                        as='textarea'
                                        onChange={handleChange}
                                        placeholder='Add Comment Here'
                                        value={comments.text}
                                    />
                                    <Container className='button-container'>
                                        <Button className='btn btn-dark comment-btn' name='text' type='submit'>
                                            Post Comment
                                        </Button>
                                    </Container>
                                </Form.Group>
                            </Form>
                            {/* Comments */}

                            {!articles.comments.length ? (
                                <></>
                            ) : (
                                <>
                                    {articles.comments.sort(
                                        (a, b) =>
                                            new Date(b.created_at) - new Date(a.created_at)
                                    ).map((comment) => {
                                        return (
                                            <Box mb={2} key={comment.id}>
                                                <Box>
                                                    <Box>
                                                        <Box my={30} mx={30}>
                                                            <Image mx={30} borderRadius='full' boxSize='40px' src={comment.owner.profile_image} />
                                                            <Text mx={30} textColor={'grey'}>{comment.owner.username}</Text>
                                                            <Text mx={30}>{comment.text}</Text>
                                                            <Divider />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        )
                                    })}
                                </>
                            )}
                        </div>
                    </>
                )}
            </div >
        </Container>
    )
}

export default Article