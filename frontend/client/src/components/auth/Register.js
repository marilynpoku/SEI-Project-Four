import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Modal, ModalContent, ModalHeader, Text, ModalBody, ModalCloseButton, ModalOverlay, ModalFooter, Container } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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
                backdropInvert='20%'
                backdropBlur='2px'
            />
        )
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayTwo />)


    const handleChange = (e) => {
        const newObj = { ...formData, [e.target.name]: e.target.value }
        // console.log('e.target.value', e.target.value)
        // console.log('e.target.name', e.target.name )
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
                    {/* <ModalCloseButton class /> */}

                    {/* REGISTER FORM */}

                    <ModalBody pb={6}>
                        <Form>
                            <Row className='text-center'>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className='form-label-text'>First Name</Form.Label>
                                        <Form.Control onChange={handleChange} type='text' name='first_name' placeholder='First Name' defaultValue={formData.first_name} />
                                        {formErrors.first_name && <Form.Text>{formErrors.first_name}</Form.Text>}
                                    </Form.Group>

                                    <Form.Group mt={1}>
                                        <Form.Label className='form-label-text'>Last name</Form.Label>
                                        <Form.Control onChange={handleChange} type='text' name='last_name' placeholder='Last Name' defaultValue={formData.last_name} />
                                        {formErrors.last_name && <Form.Text>{formErrors.last_name}</Form.Text>}
                                    </Form.Group>


                                    <Form.Group mt={1}>
                                        <Form.Label className='form-label-text'>Email</Form.Label>
                                        <Form.Control onChange={handleChange} type='email' name='email' placeholder='Email' defaultValue={formData.email} />
                                        {formErrors.email && <Form.Text>{formErrors.email}</Form.Text>}
                                    </Form.Group>


                                    <Form.Group mt={1}>
                                        <Form.Label className='form-label-text'>Username</Form.Label>
                                        <Form.Control onChange={handleChange} type='text' name='username' placeholder='username' defaultValue={formData.username} />
                                        {formErrors.username && <Form.Text>{formErrors.username}</Form.Text>}
                                    </Form.Group>


                                    <Form.Group mt={1}>
                                        <Form.Label className='form-label-text'>Password</Form.Label>
                                        <Form.Control onChange={handleChange} type='password' name='password' placeholder='password' defaultValue={formData.password} />
                                        {formErrors.password && <Form.Text>{formErrors.password}</Form.Text>}
                                    </Form.Group>

                                    <Form.Group mt={1}>
                                        <Form.Label className='form-label-text'>Password Confirmation</Form.Label>
                                        <Form.Control onChange={handleChange} type='password' name='password_confirmation' placeholder='password confirmation' defaultValue={formData.password_confirmation} />
                                        {formErrors.password_confirmation && <Form.Text>{formErrors.password_confirmation}</Form.Text>}
                                    </Form.Group>

                                    <Form.Group mt={1}>
                                        <Form.Label className='form-label-text'>Profile Image</Form.Label>
                                        <Form.Control onChange={handleChange} type='file' name='profile_image' placeholder='Profile Image' defaultValue={formData.profile_image} />
                                        {formErrors.profile_image && <Form.Text>{formErrors.profile_image}</Form.Text>}
                                    </Form.Group>
                                </Col>
                                <Container className='button-container'>
                                    <Button className='btn-light btn' onClick={handleSubmit}>Submit</Button>
                                </Container>
                            </Row>
                        </Form>


                    </ModalBody>


                    {/* <ModalFooter> */}
                    {/* <Container className='button-container'>
                        <Button className='btn-light btn' onClick={handleSubmit}>Submit</Button>
                    </Container> */}
                    {/* </ModalFooter> */}
                </ModalContent>
            </Modal>

        </>
    )
}

export default Register

