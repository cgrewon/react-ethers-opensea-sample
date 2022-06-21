
import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/layout/mainlayout'
import {
    Box, Text,
    HStack,
    Button,
    IconButton,
    InputGroup,
    Input,
    InputRightElement,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Tfoot
} from '@chakra-ui/react'
import {
    ChevronDownIcon, ChevronUpIcon, Search2Icon
} from '@chakra-ui/icons'

import Header from '../../components/header/header'
import ArtistProfileMainContainer from '../../components/artist/profile_main_container'

import { useAuth } from '../../context/AuthContext'
import { useApi } from '../../context/ApiContext'


export function FanTable({ slug, users }) {

    return <Table variant='simple' size='sm' mt={5}>
        <Thead>
            <Tr>
                <Th>{slug} NAME</Th>
                <Th>DATE JOINED</Th>
                <Th></Th>
            </Tr>
        </Thead>
        <Tbody>
            {
                users.map(user => {
                    return <Tr>
                        <Td>{user.username}</Td>
                        <Td>{user.created_at}</Td>
                        <Td>
                            <Button
                                _focus={{ outline: 'none' }}
                                variant={'link'}>
                                View Member
                            </Button>
                        </Td>
                    </Tr>
                })
            }


        </Tbody>

    </Table>
}


export default function ArtistFansFollowers({ }) {
    const Api = useApi()
    const { user, authtoken } = useAuth()
    const [curTab, setCurTab] = useState(0)
    const [numberFans, setNumberFans] = useState(0)
    const [numberFollowings, setNumberFollowings] = useState(0)
    const [fans, setFans] = useState([])
    const [followings, setFollowings] = useState([])
    const [fanOffset, setFanOffset] = useState(0)


    const loadData = async () => {
        try {
            const res = await Api.getNumberFans(user.id)
            if (res.status == 200) {
                setNumberFans(res.data)
            }

            const resFollowingsNumber = await Api.getNumberFollowings(user.id)
            if (resFollowingsNumber.status == 200) {
                setNumberFollowings(resFollowingsNumber.data)
            }

            const resFans = await Api.getFans(user.id, fanOffset, 100)
            if (resFans.status == 200 && resFans.data) {
                setFans(resFans.data.fans)
            } else {
                setFans([])
            }
            const resFollowings = await Api.getFollowings(user.id, fanOffset, 100)
            if (resFollowings.status == 200 && resFollowings.data) {
                setFollowings(resFollowings.data.followings)
            } else {
                setFollowings([])
            }
        } catch (ex) {
            console.log(ex)
        }

    }
    useEffect(() => {
        if (user) {
            (async () => {
                await loadData();
            })()

        }
    }, [user])

    return (
        <MainLayout>
            <Header />
            <ArtistProfileMainContainer>
                <HStack justifyContent={'center'} w='100vw' mt={3} gap={2}>
                    <Box mx={2} >
                        <Button
                            variant={'unstyled'}
                            borderBottom={curTab == 0 ? '1px solid gray' : ''}
                            onClick={() => { setCurTab(0) }}
                            borderRadius={0}
                            _focus={{ outline: 'none' }}
                            mb={1}
                        >
                            <Text color='gray.500' fontSize={'md'}>FANS</Text>
                        </Button>
                        <Text fontWeight={'bold'} fontSize='md'>{numberFans}</Text>
                    </Box>
                    <Box mx={2}>
                        <Button
                            _focus={{ outline: 'none' }}
                            borderRadius={0}
                            variant={'unstyled'}
                            mb={1}
                            borderBottom={curTab == 1 ? '1px solid gray' : ''}
                            onClick={() => { setCurTab(1) }}
                        >
                            <Text color='gray.500' fontSize={'md'}>FOLLOWERS</Text>
                        </Button>
                        <Text fontWeight={'bold'} fontSize='md'>{numberFollowings}</Text>
                    </Box>
                </HStack>
                <InputGroup size='md' px={3} mt={3}>
                    <Input
                        pr='3rem'
                        type={'text'}
                        outline={'1px solid gray'}
                        placeholder='Search fans/followers...'
                    />
                    <InputRightElement>
                        <IconButton
                            bg={'gray.300'}
                            ml={-6}
                            variant={'fill'}
                            _focus={{ outline: 'none' }}
                            icon={<Search2Icon />}
                        />
                    </InputRightElement>
                </InputGroup>
                {
                    curTab == 0 ? <FanTable users={fans} slug='Fan' /> :
                        <FanTable users={followings} slug='Followings' />
                }

            </ArtistProfileMainContainer>
        </MainLayout>
    )
}   