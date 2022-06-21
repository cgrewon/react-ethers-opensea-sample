
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

import Blog1 from '../../assets/blog1.jpeg';
import Blog2 from '../../assets/blog2.jpeg';
import Blog3 from '../../assets/blog3.jpeg';
import Blog4 from '../../assets/blog4.jpeg';

import Slider from "react-slick";

export default function SimpleSlider() {

    

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 3,
        speed: 1000,
        rows: 1,
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '10px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '10px',
                    slidesToShow: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            <Box px={10}>
                <Image src={Blog1} w={'40vw'} h='25vw' objectFit={'cover'} />
                <Text mt={5} fontSize='sm' color='white' textAlign={'left'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
            </Box>
            <Box px={10}>
                <Image src={Blog2} w={'40vw'} h='25vw' objectFit={'cover'} />
                <Text mt={5} fontSize='sm' color='white' textAlign={'left'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
            </Box>
            <Box px={10}>
                <Image src={Blog3} w={'40vw'} h='25vw' objectFit={'cover'} />
                <Text mt={5} fontSize='sm' color='white' textAlign={'left'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
            </Box>
            <Box px={10}>
                <Image src={Blog4} w={'40vw'} h='25vw' objectFit={'cover'} />
                <Text mt={5} fontSize='sm' color='white' textAlign={'left'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
            </Box>
        </Slider>
    );
}
