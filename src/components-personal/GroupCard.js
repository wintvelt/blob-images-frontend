import React from 'react';
import { useRouter } from 'next/router';

import DataProvider, { useApiData } from '../../src/components-generic/DataProvider';
import GroupCardLayout from './GroupCardLayout';

const GroupCardMain = () => {
    const data = useApiData();
    return <GroupCardLayout {...data} withEdit={false}/>
}

const GroupCard = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const source = {
        title: 'Foto\'s van Blob',
        subtitle: 'Laag naar de top sinds 1985',
        stats: [
            'since 8 Jan 2019',
            '6 albums',
            '492 photos',
            '19 members'
        ],
        image: '/cover_2.jpg',
        userIsAdmin: true,
    }
    return <DataProvider source={source}>
        <GroupCardMain />
    </DataProvider>
}

export default GroupCard;