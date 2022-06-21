

import React, {useEffect, useState} from 'react';
import { Box, Text, } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TokenKey, useAuth } from '../../context/AuthContext';
import { useApi } from '../../context/ApiContext';


export default function MainLayout({ children }){
    
    const Api = useApi()
    const navigate = useNavigate();
    const location = useLocation();
    const {user, storeUser, storeToken} = useAuth();
       

    const checkUser = async(authtoken)=>{
        try{
            console.log('check user')
            const res = await Api.checkToken(authtoken);

            if (res.status == 201 && res.data && res.data.token && res.data.user){
                storeUser(res.data.user)
                storeToken(res.data.token);
                if(!res.data.user.isActive) {
                    navigate('/email_confirm')
                } else {
                    //* check wallet is connected 

                    if (!res.data.user.wallets || res.data.user.wallets.length <= 0) {
                        if (location.pathname != '/connect_wallets') {
                            window.location.href = '/connect_wallets'
                        }
                    }
                }
            } else {
                if (location.pathname != '/'){
                    navigate('/')
                } 
            }
        }catch(ex){
            console.log(ex);
            return null;
        }
        
    }

    useState(()=>{
        const authtoken = window.sessionStorage.getItem(TokenKey)

        console.log({authtoken})

        if(authtoken) {
            (async()=>{
                await checkUser(authtoken)
            })()
        }      
        
    }, [])


    return <Box w='100vw' h='100vh' overflowY={'auto'} bgColor={'#271d33'}>
        {children}
    </Box>
};


