import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useApiData } from '../../src/components-generic/DataProvider';
import GroupCardLayout from './GroupCardLayout';
import CardList from '../components-generic/CardList';

const GroupList = () => {
    const router = useRouter();
    const groups = useApiData('groups', '/groups');
    const groupsList = groups.data || [1, 2].map(id => ({ id, isLoading: true }));
    const groupAddProps = {
        text: 'new group',
        path: '/personal/groups/[id]/edit',
        asPath: '/personal/groups/new/edit'
    };
    useEffect(() => {
        if (groupsList.length === 0) {
            router.push(groupAddProps.path, groupAddProps.asPath);
        }
    }, [groupsList]);
    const groupsWithEdit = (groups.isLoading) ?
        groupsList
        : groupsList.map(item => ({ ...item.group, withEdit: true, userIsAdmin: (item.role === 'admin') }));
    return <div style={{ padding: '24px' }}>
        <CardList list={groupsWithEdit} component={GroupCardLayout} addProps={groupAddProps}
            width={3} spacing={2} isLoading={groups.isLoading} />
    </div>
}

export default GroupList;