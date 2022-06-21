
import React, { useEffect, useState } from 'react'

import {
    Text,
    Flex, Button,
    Image,
    Grid,
    Box,
    AspectRatio,
    Stack,
    HStack,
    Spinner
} from '@chakra-ui/react'
import NFTBanner from '../../assets/nft_banner.jpeg'
import BlogImg from '../../assets/blog1.jpeg'
import MusicImg from '../../assets/music.jpeg'
import { Utils } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'

export default function NFTListView({ title, isLoading = false, assets = [], cols = 2, showViewAll = true }) {

    const navigate = useNavigate()

    const onClick = (asset) => {
        console.log(asset)
        navigate(`/nft/${asset.token_id}/${asset.asset_contract.address}`)
    }

    let templateColumns = `repeat(${cols}, 1fr)`

    if (typeof cols == 'object') {
        templateColumns = {}
        Object.keys(cols).forEach(key => {
            templateColumns[key] = `repeat(${cols[key]}, 1fr)`
        });
    }

    return (
        <React.Fragment>
            <Flex justifyContent='space-between' alignItems={'center'} px={3} pt={0} borderBottom='1px solid gray'>
                <HStack>
                    <Text fontWeight={'bold'} fontSize={['xs', 'sm']}>{title}</Text>
                    {
                        isLoading && <Spinner  size='sm' color='cyan'/>
                    }
                </HStack>

                {
                    showViewAll && <Button variant='ghost' _focus={{ outline: 'none' }}>
                        <Text fontWeight={'bold'} fontSize={['xs', 'sm']}>VIEW ALL</Text>
                    </Button>
                }
            </Flex>

            <Grid templateColumns={templateColumns} gap={3} mx={0} my={3}>
                {
                    assets.map(asset => {
                        return <Box
                            key={asset.token_id + asset.asset_contract.address}
                            borderRadius={10}
                            bg={'white'}
                            filter={'drop-shadow(0 0 0.4rem #3333)'}
                            onClick={() => onClick(asset)}
                        >
                            <AspectRatio ratio={1}>
                                <Image borderTopRadius={10} src={asset.image_preview_url} w='100%' h='100%' />
                            </AspectRatio>
                            <Stack gap={0} px={2} py={2}>
                                <Text textAlign={'left'} fontSize={'xs'}>{asset.collection.name}</Text>
                                <Text mt={'0px !important'} textAlign={'left'} fontSize={'sm'}>{Utils.shortStr(asset.name, 12)}</Text>
                            </Stack>
                        </Box>
                    })
                }
            </Grid>
        </React.Fragment>
    )
}