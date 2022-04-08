import React, { useState } from 'react'
import axios from 'axios'
import  {Link } from 'react-router-dom'
import { Container, Heading } from '@chakra-ui/react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const [formErrors, setFormErrors] = useState('')

    const navigate = useNavigate()

    const handleChange = (e) => {
        const newValue = { ...formData, [e.target.name]: e.target.value }
        setFormData(newValue)
        setFormErrors('')
    }

    const setTokenToLocalStorage = (token) => {
        window.localStorage.setItem('otisx-login-token', token)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/auth/login/', formData)
            setTokenToLocalStorage(data.token)
            navigate('/')
        } catch (error) {
            console.log(error.response)

            setFormErrors(error.response.data.detail)
        }
    }

    return (
        <>
        <Container display='flex' flexDir='center' justifyContent='center' alignItems='center'>
                <Form className='auth-form mt-4' onSubmit={handleSubmit}>
                    <Heading as='h5' size='sm' mt='5vh' textAlign='center'>Your account for everything Otisx</Heading>
                    {/* Username */}
                    <Form.Group>
                        <Form.Control className='auth-form-control' onChange={handleChange} type='text' name='username' placeholder='Username' defaultValue={formData.username} />
                        {formErrors.username && <Form.Text>{formErrors.username}</Form.Text>}
                    </Form.Group>
                    {/* Password */}
                    <Form.Group className='mb-1'>
                        <Form.Control className='auth-form-control' onChange={handleChange} type='password' name='password' placeholder='Password' defaultValue={formData.password} />
                        {formErrors.password && <Form.Text>{formErrors.password}</Form.Text>}
                    </Form.Group>
                    {/* Submit */}
                    <Form.Group className='text-center mt-2 mb-4'>
                        <Button className='btn btn-dark' type='submit'>Submit</Button>
                    </Form.Group>
                    <p className='text-muted'>Not a member? <Link className='register-link' to={`/register`}>Join Us.</Link></p>
                </Form>
            </Container>
        </>
    )
}

export default Login