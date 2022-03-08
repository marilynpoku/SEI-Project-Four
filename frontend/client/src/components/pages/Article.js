import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

const Article = () => {

    const [articles, setArticles] = useState([])

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
    }, [])


    return (
        <section>
            <h1>articles</h1>
            <p>article title: {articles.title}</p>
            <p>article tagline: {articles.tagline}</p>
            <p>article text: {articles.text}</p>
            <p>article Image:</p>
            <img src={articles.image} alt='articleImage'></img>
            <p>article image_extra:</p>
            <img src={articles.image_extra} alt='articleimage_extra'></img>
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
