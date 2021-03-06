import React, { useState } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../auth/helpers.js'
import { Container } from '@chakra-ui/react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const CreateArticle = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        tagline: '',
        text: '',
        image: '',
        image_extra: '',
    })

    const [formErrors, setFormErrors] = useState('')


    const handleChange = (e) => {
        if (e.target) {
            const newObj = { ...formData, [e.target.name]: e.target.value }
            setFormData(newObj)
        } else {
            console.log(e)
            const arrayOfValues = e.map((formData) => {
                return formData.owner.username
            })
            console.log(arrayOfValues)
            const newValue = { ...formData, text: arrayOfValues }
            setFormData(newValue)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/articles/', formData, {
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
            navigate(`/article/${data.id}`)
        } catch (err) {
            console.log(err.response.data.detail)
        }
    }


    return (
        <>
            <Container display='flex' flexDir='column' justifyContent='center' alignItems='center' >
                <Form className='auth-form' onSubmit={handleSubmit}>
                    {/* Title */}
                    <Form.Group>
                        <Form.Control required name='title' type='title' placeholder='Article heading' onChange={handleChange} />
                    </Form.Group>

                    {/* TAGLINE */}
                    <Form.Group>
                        <Form.Control required name='tagline' type='tagline' placeholder='Article tagline' onChange={handleChange} />
                    </Form.Group>

                    {/* TEXT */}
                    <Form.Group>
                        <Form.Control required as='textarea' name='text' type='text' placeholder='Article text' onChange={handleChange} />
                    </Form.Group>

                    {/* IMAGE 1 */}
                    <Form.Group>
                        <Form.Control required name='image' type='file' placeholder='image' onChange={handleChange} />
                        <Form.Text className='text-muted article-form-text'>
                            Jaz up your article with some images.
                        </Form.Text>
                    </Form.Group>

                    {/* IMAGE 2 */}
                    <Form.Group>
                        <Form.Control required name='image_extra' type='file' placeholder='second image' onChange={handleChange} />
                    </Form.Group>

                    {/* SUBMIT BUTTON */}
                    <Form.Group className='mt-4 text-center mb-4'>
                        <Button className='btn btn-secondary' type='submit' onClick={handleSubmit}>
                            Create Article
                        </Button>
                    </Form.Group>

                </Form>
            </Container>
        </>
    )
}

export default CreateArticle