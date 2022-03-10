import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Modal, ModalContent, ModalHeader, Text, ModalBody, ModalCloseButton, ModalOverlay, ModalFooter } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import Form from 'react-bootstrap/Form'
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

    return (
        <>
            <Button
                ml='4'
                onClick={() => {
                    setOverlay(<OverlayTwo />)
                    onOpen()
                }}
            > Login </Button>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />

                    {/* REGISTER FORM */}

                    <ModalBody pb={6}>
                        <Form>



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

export default Login