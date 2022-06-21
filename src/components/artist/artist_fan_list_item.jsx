
import React, { useEffect, useState } from 'react'
import {
    Box,
    Text,
    Flex,
    Image,
} from '@chakra-ui/react'

import NFTBanner from '../../assets/nft_banner.jpeg'


export default function ArtistFanListItem({ }) {

    return (
        <Box w='100%' filter={'drop-shadow(0 0 0.4rem #3333)'} bg='gray.100'>
            <Flex w='100%' px={5} alignItems='center' >
                <Image src={NFTBanner} w='50px' h='50px' />
                <Flex justifyContent={'space-between'} alignItems='center' flex={1}>
                    <Box mx={3} align='left'>
                        <Text fontSize={'md'} fontWeight={'bold'}>FAN _NFT#324</Text>
                        <Text fontSize={'sm'} color={'gray.700'}>3 hours ago</Text>
                    </Box>
                    <Text>COLLECTED: 4</Text>
                </Flex>
            </Flex>

        </Box>
    )
}