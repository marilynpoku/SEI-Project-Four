import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heading, Text, Image, Button } from '@chakra-ui/react'

import axios from 'axios'

const Article = () => {

    const [articles, setArticles] = useState('')
    const [likedBy, setLikedBy] = useState([])
    const [hasLiked, setHasLiked] = useState(null)


    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`/api/articles/${id}`)
                console.log('article DATA', data)
                setArticles(data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [id])


    return (
        <section>

            <Heading size='lg' fontSize='30px' textAlign='center'>{articles.title}</Heading>
            <Text size='lg' fontSize='20px' textAlign='center'>{articles.tagline}</Text>
            <Image borderRadius='full' boxSize='100%' src={articles.image} alt='brand logo' />
            <Text size='sm' fontSize='10px' textAlign='justify'>{articles.text}</Text>

            {/* NEED TO POPULATE ARTICLE, ARTICLE_LIKES, COMMENT & COMMENT_LIKES WITH OWNER INFO */}
            <Text size='sm' fontSize='10px' textAlign='justify'>OWNER: {articles.owner}</Text>

            <Image borderRadius='full' boxSize='100%' src={articles.image_extra} alt='brand logo' />

            <Button className='px-5' colorScheme='red' size={'sm'}> LIKE </Button>

            {articles && (

                <>
                    <Text>Comments</Text>
                    {articles.comments.map((comment, index) => {
                        return (
                            <>
                                <Text key={index}>{comment.text}</Text>
                                <Text>{comment.comment_likes}</Text>
                            </>
                        )
                    })}
                    {/* 
                <Text>Articles Likes Here</Text>
                    {articles.article_likes.map((like, i) => {
                        return (
                            <>
                                <Text key={i}>{like.owner}</Text>
                            </>
                        )
                    })} */}
                </>

            )}

            {/* <p>comments: {articles.comments.map((comment) => {
                return (
                    <p> {articles.comments.text} </p>
                )
            })}
                
                {articles.comments.text}</p> */}
        </section>
    )
}

export default Article
