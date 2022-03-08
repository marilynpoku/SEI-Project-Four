import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Modal, ModalContent, ModalHeader, Text, ModalBody, ModalCloseButton, ModalOverlay, ModalFooter } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form'

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

    const OverlayTwo = () => {
        return (
            <ModalOverlay
                bg='none'
                backdropFilter='auto'
                backdropInvert='80%'
                backdropBlur='2px'
            />
        )
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayTwo />)

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const { data } = await axios.post('/api/register')
    //             console.log('data ->', data)

    //         } catch (error) {
    //             console.log('error ->', error)
    //         }
    //     }
    //     getData()
    // }, [])

    const handleChange = (e) => {
        const newObj = { ...formData, [e.target.name]: e.target.value }
        console.log('e.target.value', e.target.value)
        // console.log('e.target.name', e.target.name )
        setFormData(newObj)
        setFormErrors({ ...formErrors, [e.target.name]: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/auth/register/', formData)
            navigate('/login')
        } catch (error) {
            setFormErrors({ ...formErrors, ...error.response.data.errors })
        }
    }


    return (
        <>

            <Button
                ml='4'
                onClick={() => {
                    setOverlay(<OverlayTwo />)
                    onOpen()
                }}
            > Sign up </Button>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />

                    {/* REGISTER FORM */}

                    <ModalBody pb={6}>
                        <Form>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control onChange={handleChange} type='text' name='first_name' placeholder='First Name' defaultValue={formData.first_name} />
                                {formErrors.first_name && <Form.Text>{formErrors.first_name}</Form.Text>}
                            </Form.Group>

                            <Form.Group mt={4}>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control onChange={handleChange} type='text' name='last_name' placeholder='Last Name' defaultValue={formData.last_name} />
                                {formErrors.last_name && <Form.Text>{formErrors.last_name}</Form.Text>}
                            </Form.Group>


                            <Form.Group mt={4}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={handleChange} type='email' name='email' placeholder='Email' defaultValue={formData.email} />
                                {formErrors.email && <Form.Text>{formErrors.email}</Form.Text>}
                            </Form.Group>


                            <Form.Group mt={4}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={handleChange} type='text' name='username' placeholder='username' defaultValue={formData.username} />
                                {formErrors.username && <Form.Text>{formErrors.username}</Form.Text>}
                            </Form.Group>


                            <Form.Group mt={4}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={handleChange} type='password' name='password' placeholder='password' defaultValue={formData.password} />
                                {formErrors.password && <Form.Text>{formErrors.password}</Form.Text>}
                            </Form.Group>

                            <Form.Group mt={4}>
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control onChange={handleChange} type='password' name='password_confirmation' placeholder='password confirmation' defaultValue={formData.password_confirmation} />
                                {formErrors.password_confirmation && <Form.Text>{formErrors.password_confirmation}</Form.Text>}
                            </Form.Group>

                            <Form.Group mt={4}>
                                <Form.Label>Profile Image</Form.Label>
                                <Form.Control onChange={handleChange} type='file' name='profile_image' placeholder='Profile Image' defaultValue={formData.profile_image} />
                                {formErrors.profile_image && <Form.Text>{formErrors.profile_image}</Form.Text>}
                            </Form.Group>


                        </Form>

                    </ModalBody>


                    <ModalFooter>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default Register

