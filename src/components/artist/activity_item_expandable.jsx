
import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/layout/mainlayout'
import {
    Avatar, Box, Text,
    HStack, Stack,
    Flex, Button,
    Image,
    IconButton,
    Grid,
    AspectRatio
} from '@chakra-ui/react'
import {
    ChevronDownIcon, ChevronUpIcon
} from '@chakra-ui/icons'
import { useAuth } from '../../context/AuthContext'
import Header from '../../components/header/header'
import NFTBanner from '../../assets/nft_banner.jpeg'
import EthLogo from '../../assets/eth-logo.png'
import MusicImg from '../../assets/music.jpeg'
import BlogImg from '../../assets/blog1.jpeg'



export function ActivityItemExpandable({ showMore, onShowMore }) {

    return (
        <Box w='100%' filter={'drop-shadow(0 0 0.4rem #3333)'} bg='gray.100'>
            <Flex w='100%' px={5} alignItems='center' >
                <Image src={NFTBanner} w='50px' h='50px' />
                <Flex justifyContent={'space-between'} flex={1}>
                    <Box mx={3} align='left'>
                        <Text fontSize={'md'} fontWeight={'bold'}>FAN _NFT#324</Text>
                        <Text fontSize={'sm'} color={'gray.700'}>3 hours ago</Text>
                    </Box>
                    <Flex alignItems={'center'}>
                        <Image src={EthLogo} w='20px' objectFit={'contain'} />
                        <Text fontSize={'md'} color='gray.800'>0.00001</Text>
                        <IconButton
                            _focus={{ outline: 'none' }}
                            onClick={() => onShowMore(!showMore)}
                            icon={showMore ?
                                <ChevronUpIcon w='20px' h='20px' /> :
                                <ChevronDownIcon w='20px' h='20px' />}
                        />
                    </Flex>
                </Flex>
            </Flex>
            <Flex w='100%' px={5} justifyContent='space-between' alignItems='center' my={3} transition="all ease 0.3s" display={showMore ? 'flex' : 'none'}>
                <Box>
                    <Text fontSize={'sm'} color={'gray.700'}>From</Text>
                    <Text fontSize={'md'} fontWeight={'bold'}>Artist Name.</Text>
                </Box>
                <Box>
                    <Text fontSize={'sm'} color={'gray.700'}>To</Text>
                    <Text fontSize={'md'} fontWeight={'bold'}>Artist Name.</Text>
                </Box>
                <Box>
                    <Text fontSize={'sm'} color={'gray.700'}>Quantity</Text>
                    <Text fontSize={'md'} fontWeight={'bold'}>1</Text>
                </Box>
                <Box>
                    <Text fontSize={'sm'} color={'gray.700'}>USD Price</Text>
                    <Text fontSize={'md'} fontWeight={'bold'}>$2.79</Text>
                </Box>
            </Flex>
        </Box>
    )
}