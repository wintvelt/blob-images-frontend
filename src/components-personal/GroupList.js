import React from 'react';

import DataProvider, { useApiData } from '../../src/components-generic/DataProvider';
import GroupCardLayout from './GroupCardLayout';
import CardList from '../components-generic/CardList';

const testGroups = {
    groups: [
        {
            id: 'group1',
            title: 'Foto\'s van Blob',
            subtitle: 'Laag naar de top sinds 1985',
            image: '/cover_2.jpg',
            userIsAdmin: true,
        },
        {
            id: 'group2',
            title: 'In \'t Velt familiealbums',
            subtitle: 'Door de jaren heen in Soest en daarbuiten',
            image: '/cover_2.jpg',
            userIsAdmin: true,
        },
        {
            id: 'group3',
            title: 'LamInt photos',
            subtitle: 'Sharing family life',
            image: '/cover_2.jpg',
            userIsAdmin: false,
        },
    ]
};

const GroupListMain = () => {
    const data = useApiData();
    const groups = data.groups || [1, 2].map(id => ({ id }));
    const groupsWithEdit = (data.groups) ?
        groups.map(item => ({ ...item, withEdit: true }))
        : groups;
    return <CardList list={groupsWithEdit} component={GroupCardLayout} width={3} spacing={2} />
}

const GroupList = () => {
    const source = testGroups;
    return <DataProvider source={source}>
        <div style={{ padding: '24px' }}>
            <GroupListMain />
        </div>
    </DataProvider>
}

export default GroupList;