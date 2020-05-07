import React from 'react';
import { useRouter } from 'next/router';

import { useApiData, sampleData } from '../../src/components-generic/DataProvider';
import GroupHeaderLayout from './GroupHeaderLayout';

const GroupHeader = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const source = `myurl/getGroup/${groupId}`;
    const groupData = useApiData('group',source);
    const sampleGroup = sampleData(groupData, {
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
    });
    return <GroupHeaderLayout group={sampleGroup}/>
}

export default GroupHeader;