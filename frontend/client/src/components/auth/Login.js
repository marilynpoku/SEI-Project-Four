import React, { useState } from 'react'
import axios from 'axios'
import { Button, Modal, ModalContent, ModalBody, ModalOverlay, Box, Container } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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

    return (
        <>
            <Container display='flex' justifyContent='center' alignItems='center'>
                <Button
                    ml='4'
                    onClick={() => {
                        setOverlay(<OverlayTwo />)
                        onOpen()
                    }}
                > Login </Button>
            </Container>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>


                    {/* REGISTER FORM */}

                    <ModalBody pb={6}>
                        <Form>
                            <Box display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                                <Row className='text-center'>
                                    <Col md={6}>
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
                                    </Col>

                                    <Container className='button-container' display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                                        <Button className='btn-light btn' onClick={handleSubmit}>Submit</Button>
                                    </Container>

                                </Row>
                            </Box>
                        </Form>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>
    )
}

export default Login