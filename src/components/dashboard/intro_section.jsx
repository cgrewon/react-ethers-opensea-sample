

import React from 'react';
import { Text, Flex, } from '@chakra-ui/react';



export default function IntroSection(){

    return  <Flex
    w="100%"
    bgColor={'#303f66'}
    direction='column'
    justifyContent='center'
    alignItems={'center'}
    mx='auto'
    pt={10}
    px='10%'>
    <Text fontSize='5xl' color='white'>Introduction</Text>
    <Text fontSize='md' color='white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a libero molestie, feugiat risus eget, consequat purus. Nunc ut suscipit diam. Vestibulum dignissim lectus ut volutpat varius. Maecenas at suscipit mauris. Proin vitae mattis tortor, non lacinia nisl. Morbi ornare est at euismod hendrerit. Mauris non dolor blandit metus iaculis tempus id vitae felis. Aenean vehicula blandit mattis. Quisque viverra eros nec velit auctor maximus.</Text>

</Flex>
}