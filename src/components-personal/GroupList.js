import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useApiData } from '../../src/components-generic/DataProvider';
import GroupCardLayout from './GroupCardLayout';
import GroupCardAdd from './GroupCardAdd';
import CardList from '../components-generic/CardList';

const GroupList = () => {
    const router = useRouter();
    const groups = useApiData('groups', '/groups');
    const groupsList = groups.data || [1, 2].map(id => ({ id, isLoading: true }));
    useEffect(() => {
        if (groupsList.length === 0) {
            router.push('/personal/groups/[id]/edit', '/personal/groups/new/edit')
        }
    }, [groupsList]);
    const groupsWithEdit = (groups.isLoading) ?
        groupsList
        : groupsList.map(item => ({ ...item.group, withEdit: true }));
    return <div style={{ padding: '24px' }}>
        <CardList list={groupsWithEdit} component={GroupCardLayout} addComponent={GroupCardAdd}
            width={3} spacing={2} isLoading={groups.isLoading} />
    </div>
}

export default GroupList;