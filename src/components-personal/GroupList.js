import React, { useEffect } from 'react';

import GroupCardLayout from './GroupCardLayout';
import CardList from '../components-generic/CardList';
import { useSetLoadingPath } from '../data/loadingData';
import { useRecoilValueLoadable } from 'recoil';
import { userGroups } from '../data/userData';
import { useUserGroups } from '../data/activeTree-UserGroups';

const paddingStyle = { padding: '24px' };

const GroupList = () => {
    const setLoadingPath = useSetLoadingPath();
    const groupsData = useUserGroups();
    const hasValue = (groupsData.contents && !groupsData.hasError);
    const groupsList = (hasValue)? groupsData.contents : [1, 2].map(id => ({ id, isLoading: true }));
    const groupsListLength = groupsList?.length;
    const groupAddProps = {
        text: 'nieuwe groep',
        path: '/personal/groups/[id]/edit',
        asPath: '/personal/groups/new/edit'
    };
    useEffect(() => {
        if (groupsListLength === 0) {
            setLoadingPath(groupAddProps.path, groupAddProps.asPath);
        }
    }, [groupsListLength]);
    const groupsWithEdit = (!hasValue) ?
        groupsList
        : groupsList.map(item => ({ 
            ...item, 
            withEdit: true, 
            userIsAdmin: (item.userRole === 'admin') 
        }));
    return <div style={paddingStyle}>
        <CardList list={groupsWithEdit} component={GroupCardLayout} addProps={groupAddProps}
            width={3} spacing={2} isLoading={!hasValue} />
    </div>
}

export default GroupList;