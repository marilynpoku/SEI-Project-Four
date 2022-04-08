import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../auth/helpers.js'
import { Container, Avatar, Text, Divider, Box } from '@chakra-ui/react'
import Button from 'react-bootstrap/Button'



const Profile = () => {

    const { id } = useParams()
    const [profile, setProfile] = useState([])
    const navigate = useNavigate()


    // Get profile
    useEffect(() => {
        const getUserProfile = async () => {
            const token = getTokenFromLocalStorage()
            try {
                const { data } = await axios.get(`/api/auth/profile/${id}/`, { headers: { Authorization: `Bearer ${token}` } })
                setProfile(data)
                console.log('users profile data', data)
            } catch (error) {
                console.log(error.response.data.detail)
            }
        }
        getUserProfile()
    }, [id])


    // Delete profile 
    const deleteProfile = async () => {
        try {
            await axios.delete(`/api/auth/profile/${id}/`, {
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`
                }
            }
            )
            navigate('/')
        } catch (error) {
            console.log(error.response.data.detail)
        }
    }


    return (

        <>
            <Container display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                <Avatar size='2xl' src={profile.profile_image} />
                <Text fontSize='24px'>{profile.username}</Text>
                <Divider />
                <Box display='flex' flexDir='row' justifyContent='center' alignItems='center'>
                    {/* <Button className='btn btn-profile btn-dark'>Edit</Button> */}
                    <Button className='btn btn-profile btn-dark' onClick={deleteProfile}>Delete</Button>
                </Box>
            </Container>

        </>
    )
}


export default Profile