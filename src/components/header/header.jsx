import React, { useEffect, useState } from 'react';
import {
    Box,
    Text,
    Flex,
    Button,
    Avatar,
    HStack,
    Icon,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Stack,
    Link
} from '@chakra-ui/react';

import {
    PhoneIcon,
} from '@chakra-ui/icons'

import CTASection from '../../components/dashboard/cta_section';
import MarketplaceSection from '../../components/dashboard/marketplace-section';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserSVG from '../../assets/user-avatar.svg'
import { GrNotification } from 'react-icons/gr'
import { HiOutlineUser } from 'react-icons/hi'
import { FiMenu } from 'react-icons/fi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Utils } from '../../utils/utils';
import UserRole from '../../utils/role.enum'


export function DrawerMenuItems({ onClose }) {
    const { user, signOut } = useAuth();
    const navigate = useNavigate()

    const onLogin = () => {
        navigate('/login')
    }


    const onSignout = ()=>{
        signOut()
        navigate('/')
    }

    console.log(user)
    if (user) {
        return <Stack gap={1}>
            <Button
                variant={'unstyled'}
                _focus={{ outline: 'none' }}
                onClick={() => {

                    navigate(user.role == UserRole.Artist ? '/artist' : '/fan')
                    onClose()
                }}
            >
                Profile
            </Button>
            <Button
                variant={'unstyled'}
                _focus={{ outline: 'none' }}
                onClick={() => {
                    onClose()
                    navigate('/artist/nfts')
                }}
            >
                Feed
            </Button>
            <Button
                variant={'unstyled'}
                _focus={{ outline: 'none' }}
                onClick={() => {
                    onClose()
                    navigate('/artist/fans-followers')
                }}
            >
                Fans/Followers
            </Button>
            <Button
                variant={'unstyled'}
                _focus={{ outline: 'none' }}
                onClick={onSignout}
            >
                Sign Out
            </Button>
            <Button
                variant={'unstyled'}
                _focus={{ outline: 'none' }}
            >
                Settings
            </Button>
        </Stack>

    } else {
        return <Stack gap={1}>
            <Button
                variant={'unstyled'}
                _focus={{ outline: 'none' }}
                onClick={onLogin}
            >
                Sign In
            </Button>

        </Stack>
    }
}


export default function Header({ }) {

    const navigate = useNavigate()
    const { user, authtoken, address, connectMetamask, disConnectMetamask } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const btnRef = React.useRef()

    const onClose = () => {
        setIsOpen(false)
    }

    const onLogin = () => {
        navigate('/login')
    }

    return <Flex
        position={'fixed'}
        zIndex={100}
        top={0}
        left={0}
        w={'100vw'}
        h={{ base: '50px', md: '80px', }}
        px={{ base: 3, md: 10 }}
        bg={'#271d33'}
        justifyContent='space-between'
        alignItems={'center'}
    >

        <IconButton

            variant='solid'
            colorScheme='white'
            onClick={onLogin}
            w={'25px'} h={'25px'}
            icon={<Icon as={HiOutlineUser} w={'25px'} h={'25px'} color='white' />}
        />

        <Text color='white' fontSize={'lg'}>
            Demo
        </Text>
        <HStack>
            <IconButton
                variant='solid'
                colorScheme='white'
                w={'25px'} h={'25px'}
                icon={<Icon as={IoMdNotificationsOutline} w={'25px'} h={'25px'} color='white' />}
            />
            <IconButton
                variant='solid'
                ref={btnRef}
                _focus={{ outline: 'none' }}
                colorScheme='white'
                onClick={() => setIsOpen(true)}
                w={'25px'} h={'25px'}
                icon={<Icon as={FiMenu} w={'25px'} h={'25px'} color='white' />}
            />
        </HStack>

        <Drawer
            isOpen={isOpen}
            placement='right'
            size={'xs'}
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton _focus={{ outline: 'none' }} />
                <DrawerHeader>
                    <Text fontSize={'md'}>Connected Wallet</Text>
                    <Text fontSize={'sm'} color='gray'>{address ? Utils.shortAddr(address) : 'Not Connected'}</Text>
                    {
                        !address && <Button
                            variant={'outline'}
                            _focus={{ outline: 'none' }}
                            colorScheme='cyan'
                            size={'sm'}
                            onClick={() => { connectMetamask() }}
                        >
                            Connect Wallet
                        </Button>
                    }

                </DrawerHeader>

                <DrawerBody>
                    <DrawerMenuItems onClose={onClose} />
                </DrawerBody>

                {/* <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Logout
                    </Button>
                    <Button colorScheme='blue'>Save</Button>
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>

    </Flex>
}