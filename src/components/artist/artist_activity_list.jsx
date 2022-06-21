import React, { useEffect, useState } from 'react'

import {
    Stack,Flex, Text, Button
} from '@chakra-ui/react'
import { ActivityItemExpandable } from './activity_item_expandable';


export default function ArtistActivityList({ }) {
    const [expandedActivity, setExpandedActivity] = useState();

    return (
        <React.Fragment>
            <Flex justifyContent='space-between' px={3} mt={5}>
                <Text fontWeight={'bold'}>ACTIVITY</Text>
                <Button variant='ghost' _focus={{ outline: 'none' }}>
                    <Text fontWeight={'bold'}>VIEW ALL</Text>
                </Button>
            </Flex>
            <Stack gap={2}>
                {
                    [1, 2, 3, 4, 5, 6].map((one, index) => {
                        return <ActivityItemExpandable
                            showMore={expandedActivity == index}
                            onShowMore={() => setExpandedActivity(expandedActivity == index ? undefined : index)}
                        />
                    })
                }
            </Stack>
        </React.Fragment>
    )
}