import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/layout/mainlayout'
import {
    Avatar, Box, Text,
    HStack, Stack,
    Flex, Button,
    Image,
    IconButton,
    Grid,
    AspectRatio,
    Icon
} from '@chakra-ui/react'
import {
    ChevronDownIcon, ChevronUpIcon, ArrowBackIcon
} from '@chakra-ui/icons'
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext'
import Header from '../../components/header/header'
import NFTBanner from '../../assets/nft_banner.jpeg'
import EthLogo from '../../assets/eth-logo.png'
import MusicImg from '../../assets/music.jpeg'
import BlogImg from '../../assets/blog1.jpeg'
import TextThrobberGif from '../../assets/text-throbber.gif'
import ThrobberGif1 from '../../assets/throbber1.gif'
import { useNavigate, useParams } from 'react-router-dom';
import OSApi from '../../opensea/api';


export default function SingleNFTView({ }) {

    const navigate = useNavigate()
    const {user} = useAuth()

    const { tokenId, tokenAddr } = useParams()

    const [asset, setAsset] = useState();

    const loadSingleAsset = async (_tokenId, _tokenAddr) => {
        try {
            const res = await OSApi.getSingleAsset(_tokenId, _tokenAddr);
            console.log({ res })
            if (res.status == 200) {
                setAsset(res.data)
            } else {
                navigate(-1)
            }

        } catch (ex) {
            console.log(ex)
        }

    }

    useEffect(() => {
        if (tokenId && tokenAddr) {
            loadSingleAsset(tokenId, tokenAddr)
        }
    }, [tokenId, tokenAddr])

    return (
        <MainLayout>
            <Header />
            <Stack gap={2} mt={'70px'} w="100vw" bg='white' minH='calc(100vh - 70px)' px={3} py={3}>
                <Flex w={'100%'} justify='space-between' >
                    <HStack>
                        <IconButton
                            variant={'unstyled'}

                            _focus={{ outline: 'none' }}
                            icon={
                                <ArrowBackIcon
                                    w='30px'
                                    h={'30px'}
                                />
                            }
                            onClick={() => navigate(-1)}
                        />
                        <Box textAlign={'left'}>
                            <Text fontSize={'sm'} color='gray'>{user  ? user.username : ''}</Text>
                            <Text fontSize={'lg'} fontWeight='bold' color='black'>{asset && asset.name}</Text>
                        </Box>
                    </HStack>
                    <IconButton _focus={{ outline: 'none' }} icon={<Icon w='25px' h='25px' as={HiOutlineDotsVertical} />} />
                </Flex>
                <Flex direction={{ base: 'column', sm: 'row' }}>
                    <Box flex={1}>
                        <AspectRatio ratio={1} w={'100%'} >
                            <Image src={asset ? asset.image_url : ThrobberGif1} objectFit='cover' w={'100%'} />
                        </AspectRatio>
                    </Box>

                    {
                        asset ? <Box flex={2} m={3}>
                            <Text textAlign={'left'} fontSize='lg'>
                                {asset && asset.collection.name}
                            </Text>
                            <Text textAlign={'left'}>
                                {asset && asset.description}
                            </Text>
                        </Box> :
                        <Image src={TextThrobberGif} objectFit={'cover'} />
                    }


                </Flex>


            </Stack>
        </MainLayout>
    )
}