import React, { useEffect } from 'react';

import { useApiDataValue } from '../../src/data/apiData';
import GroupCardLayout from './GroupCardLayout';
import CardList from '../components-generic/CardList';
import { useSetLoadingPath } from '../data/loadingData';

const paddingStyle = { padding: '24px' };

const GroupList = () => {
    const setLoadingPath = useSetLoadingPath();
    const groups = useApiDataValue('groups', '/groups');
    const groupsList = groups.data || [1, 2].map(id => ({ id, isLoading: true }));
    const groupsListLength = groupsList?.length;
    const groupAddProps = {
        text: 'new group',
        path: '/personal/groups/[id]/edit',
        asPath: '/personal/groups/new/edit'
    };
    useEffect(() => {
        if (groupsListLength === 0) {
            setLoadingPath(groupAddProps.path, groupAddProps.asPath);
        }
    }, [groupsListLength]);
    const groupsWithEdit = (groups.isLoading) ?
        groupsList
        : groupsList.map(item => ({ ...item.group, withEdit: true, userIsAdmin: (item.role === 'admin') }));
    return <div style={paddingStyle}>
        <CardList list={groupsWithEdit} component={GroupCardLayout} addProps={groupAddProps}
            width={3} spacing={2} isLoading={groups.isLoading} />
    </div>
}

export default GroupList;