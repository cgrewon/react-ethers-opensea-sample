import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/layout/mainlayout'
import {
    Avatar, Box, Text,
} from '@chakra-ui/react'




export default function ArtistProfileMainContainer({ children }) {


    return (
        <Box mt={'80px'} align='left' w='100%' mx='auto' position={'relative'} h='calc(100% - 80px)'>
            <Text fontSize={'2xl'} color='white' textAlign={'center'}>Artist Name</Text>
            <Text fontSize={'md'} color='white' textAlign={'center'}>Genre</Text>
            <Box
                align='center'
                position={'relative'}
                minH='calc(100vh - 230px)'
                mt={'80px'}
                pb={6}
                bg={'whiteAlpha.900'}>
                <Avatar name='Segun Adebayo' w='90px' h='90px' src='https://bit.ly/sage-adebayo' mt='-55px' />

                {children}

            </Box>

        </Box>
    )
}