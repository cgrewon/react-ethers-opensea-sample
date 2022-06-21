import React from 'react';
import { Box, Image, Text, Grid, GridItem } from '@chakra-ui/react';
import Blog2 from '../../assets/blog2.jpeg';

export default function ProblemSection(){

    return <Box py={5}>
    <Text fontSize='5xl' color='white'>Problems</Text>
    <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} w={'60%'} mx='auto' mt={5} gap={3}>

        <GridItem>
            <Text fontSize='md' color='white' textAlign={'right'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a libero molestie, feugiat risus eget, consequat purus. Nunc ut suscipit diam. Vestibulum dignissim lectus ut volutpat varius. Maecenas at suscipit mauris. Proin vitae mattis tortor, non lacinia nisl. Morbi ornare est at euismod hendrerit. Mauris non dolor blandit metus iaculis tempus id vitae felis. Aenean vehicula blandit mattis. Quisque viverra eros nec velit auctor maximus.</Text>
        </GridItem>
        <GridItem>
            <Image src={Blog2} w={'100%'} />
        </GridItem>
    </Grid>
</Box>
}