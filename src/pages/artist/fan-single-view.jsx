
import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/layout/mainlayout'
import {
    Box,
    Text,
    Stack,
    IconButton,
    Tab,
    Tabs,
    TabList,
    TabPanels,
    TabPanel
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

import ArtistProfileMainContainer from '../../components/artist/profile_main_container'
import NFTListView from '../../components/artist/nft_list_view'
import ArtistFanListItem from '../../components/artist/artist_fan_list_item'


export default function ArtistFanSigleView({ }) {
    const [expanded, setExpanded] = useState(false);

    const onTapUpIcon = () => {
        let h = document.getElementById('desc-box').clientHeight - 90;
        console.log('height: ', h, ', top: ', document.getElementById('listContainer').style.top)

        if (document.getElementById('listContainer').style.top == (h + 180) + 'px') {
            document.getElementById('listContainer').style.top = '180px';
            setExpanded(false)
        } else {
            document.getElementById('listContainer').style.top = (180 + h) + 'px';
            setExpanded(true)
        }
    }


    return (
        <MainLayout>
            <Header />
            <ArtistProfileMainContainer>
                <Text color='gray.500' fontSize={'md'}>Joined: 21.05.2022</Text>
                <Box position={'absolute'} zIndex={1} id='desc-box' >
                    <Text mx={5} mt={4} >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </Text>
                </Box>
                <Box
                    id='listContainer'
                    w="100%"
                    bg={'white'}
                    minH={'calc(100vh - 405px)'}
                    py={2}
                    top={'180px'}
                    zIndex={2}
                    position='absolute'
                    transition={'all ease 0.3s'}
                    filter={'drop-shadow(0 0 0.5rem #e2e2e2)'}
                >
                    <Stack w="100%" bg={'white'} zIndex={100} >
                        <Box mt={-3}>
                            <IconButton
                                variant={'unstyled'}
                                _focus={{
                                    outline: 'none'
                                }}
                                onClick={onTapUpIcon}
                                icon={expanded ? <ChevronUpIcon color={'gray'} w={6} h={6} /> :
                                    <ChevronDownIcon color={'gray'} w={6} h={6} />} />
                        </Box>

                        <Tabs isFitted >
                            <TabList mb='1em'>
                                <Tab _focus={{ outline: 'none' }}>COLLECTED</Tab>
                                <Tab _focus={{ outline: 'none' }}>FAN(7)</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <NFTListView title='FREE CONTENT' cols={{ base: 2, md: 4, lg: 6 }} />
                                </TabPanel>
                                <TabPanel>
                                    <Stack gap={2}>
                                        {
                                            [1, 2, 3, 4, 5, 6].map((one, index) => {
                                                return <ArtistFanListItem />
                                            })
                                        }
                                    </Stack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>


                    </Stack>
                </Box>

            </ArtistProfileMainContainer>
        </MainLayout>
    )
}