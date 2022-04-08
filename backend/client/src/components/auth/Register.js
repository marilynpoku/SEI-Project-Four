import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const Register = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        profile_image: '',
        password: '',
        password_confirmation: '',
    })

    const [formErrors, setFormErrors] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        profile_image: '',
        password: '',
        password_confirmation: '',
    })


    const handleChange = (e) => {
        const newObj = { ...formData, [e.target.name]: e.target.value }
        setFormData(newObj)
        setFormErrors({ ...formErrors, [e.target.name]: '' })
        console.log(formErrors)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/auth/register/', formData)
            navigate('/login')
        } catch (error) {

            // TWEAKING ERROR MESSAGE -> NOT WORKING
            console.log({ ...formErrors, [e.target.name]: '' })
            console.log(error.response.data.detail)
            // setFormErrors()
            // { ...formErrors, ...error.response.data.errors }
        }
    }


    return (
        <>
            <Container display='flex' flexDir='center' justifyContent='center' alignItems='center'>
                <Form className='auth-form mt-4' onSubmit={handleSubmit}>
                    <Heading as='h5' size='sm' mt='5vh' textAlign='center'>Your account for everything Otisx</Heading>
                    {/* First name */}
                    <Form.Group>
                        <Form.Control className='auth-form-control' onChange={handleChange} type='text' name='first_name' placeholder='First name' defaultValue={formData.first_name} />
                        {formErrors.first_name && <Form.Text>{formErrors.first_name}</Form.Text>}
                    </Form.Group>
                    {/* Last name */}
                    <Form.Group>
                        <Form.Control className='auth-form-control' onChange={handleChange} type='text' name='last_name' placeholder='Last name' defaultValue={formData.last_name} />
                        {formErrors.last_name && <Form.Text>{formErrors.last_name}</Form.Text>}
                    </Form.Group>
                    {/* Username */}
                    <Form.Group>
                        <Form.Control className='auth-form-control' onChange={handleChange} type='text' name='username' placeholder='Username' defaultValue={formData.username} />
                        {formErrors.username && <Form.Text>{formErrors.username}</Form.Text>}
                    </Form.Group>
                    {/* Email */}
                    <Form.Group>
                        <Form.Control className='auth-form-control' onChange={handleChange} type='email' name='email' placeholder='Email' defaultValue={formData.email} />
                        {formErrors.email && <Form.Text>{formErrors.email}</Form.Text>}
                    </Form.Group>
                    {/* Profile image */}
                    <Form.Group>
                        <Form.Control className='auth-form-control' onChange={handleChange} type='file' name='profile_image' placeholder='Add a profile image' defaultValue={formData.profile_image} />
                        <Form.Text className='text-muted form-text'>
                            Add a profile image.
                        </Form.Text>
                        {formErrors.email && <Form.Text>{formErrors.email}</Form.Text>}
                    </Form.Group>
                    {/* Password */}
                    <Form.Group className='mb-1'>
                        <Form.Control className='auth-form-control' onChange={handleChange} type='password' name='password' placeholder='Password' defaultValue={formData.password} />
                        {formErrors.password && <Form.Text>{formErrors.password}</Form.Text>}
                    </Form.Group>
                    {/* Password Confirmation */}
                    <Form.Group>
                        <Form.Control className='auth-form-control' onChange={handleChange} type='password' name='password_confirmation' placeholder='Confirm Password' defaultValue={formData.password_confirmation} />
                        {formErrors.password_confirmation && <Form.Text>{formErrors.password_confirmation}</Form.Text>}
                    </Form.Group>
                    {/* Submit */}
                    <Form.Group className='text-center mt-2 mb-4'>
                        <Button className='btn btn-dark' type='submit'>Submit</Button>
                    </Form.Group>
                    <p className='text-muted'>Already a member? <Link className='login-link' to={`/login`}>Login.</Link></p>
                </Form>
            </Container>
        </>
    )
}

export default Register

