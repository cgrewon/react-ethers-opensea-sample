
import React from 'react';
import { Box, Image, Text, Flex, Grid, GridItem } from '@chakra-ui/react';

import Blog1 from '../../assets/blog1.jpeg';


const MarketplaceSection = () => {

    let arr = [];
    for (let i = 0; i < 12; i++) {
        arr.push(i);
    }

    return <Box py={5}>
        <Text fontSize='5xl' color='white'>Marketplace Listings</Text>
        <Grid templateColumns={{ lg: 'repeat(4, 1fr)', md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }} w={'80%'} mx='auto' mt={5} gap={3}>
            {
                arr.map(one => {
                    return <GridItem  >
                        <Flex alignItems={'flex-start'}>
                            <Image src={Blog1} w={100} />
                            <Text fontSize='sm' color='white' ml={2} textAlign={'left'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a libero.</Text>
                        </Flex>
                    </GridItem>
                })
            }
        </Grid>
    </Box>
}


export default MarketplaceSection;