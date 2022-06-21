
import React from 'react';
import { Box, Image, Text, Stack, Grid, GridItem } from '@chakra-ui/react';

import Blog1 from '../../assets/blog1.jpeg';
import Blog2 from '../../assets/blog2.jpeg';
import Blog3 from '../../assets/blog3.jpeg';
import Blog4 from '../../assets/blog4.jpeg';

export default function OpportunitiesSection() {

    return <Stack
        w="100%"
        bgColor={'#303f66'}
        py={10}
        px='10%'>
        <Text fontSize='5xl' color='white'>Opportunites</Text>
        <Grid templateColumns={{ md: 'repeat(4, 1fr)', sm: 'repeat(2, 1fr)', }} pt={10} gap={4}>
            {
                [Blog1, Blog2, Blog3, Blog4].map(img => {
                    return <GridItem>
                        <Box>
                            <Image src={img} w={'100%'} />
                            <Text fontSize='sm' textAlign={'left'} mt={2} color='white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a libero molestie, feugiat risus eget, consequat purus. Nunc ut suscipit diam. </Text>
                        </Box>
                    </GridItem>
                })
            }

        </Grid>

    </Stack>
}