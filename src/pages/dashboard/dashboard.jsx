import './dashboard.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from 'react';
import { Box, Text, } from '@chakra-ui/react';
import CTASection from '../../components/dashboard/cta_section';
import MarketplaceSection from '../../components/dashboard/marketplace-section';

import SimpleSlider from '../../components/dashboard/simpleslider';
import OpportunitiesSection from '../../components/dashboard/opt_section';
import IntroSection from '../../components/dashboard/intro_section';
import HeroSection from '../../components/dashboard/hero_section';
import ProblemSection from '../../components/dashboard/pro_section';
import SolutionSection from '../../components/dashboard/solution_section';
import FutureSection from '../../components/dashboard/future_section';
import Header from '../../components/header/header';
import MainLayout from '../../components/layout/mainlayout';


const Dashboard = ({ }) => {

    return <MainLayout>
        <Header />
        <HeroSection />
        <IntroSection />
        <OpportunitiesSection />
        <CTASection />
        <ProblemSection />
        <SolutionSection />
        <CTASection />

        <Box py={10} mb={10}>
            <Text fontSize='5xl' color='white' mb={10}>Examples/Success Stories</Text>
            <SimpleSlider />
        </Box>

        <FutureSection />

        <MarketplaceSection />
        <CTASection />

    </MainLayout>
};


export default Dashboard;



