import React from 'react';

import { useApiData } from '../../src/components-generic/DataProvider';
import GroupCardLayout from './GroupCardLayout';
import CardList from '../components-generic/CardList';

const GroupList = () => {
    const source = 'myUrl/groups';
    const groups = useApiData('groups', source);
    const groupsList = groups.data || [1, 2].map(id => ({ id, isLoading: true }));
    const groupsWithEdit = (groups.isLoading) ?
        groupsList
        : groupsList.map(item => ({ ...item, withEdit: true }));
    return <div style={{ padding: '24px' }}>
        <CardList list={groupsWithEdit} component={GroupCardLayout}
            width={3} spacing={2} />
    </div>
}

export default GroupList;