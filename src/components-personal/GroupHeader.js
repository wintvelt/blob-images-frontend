import React from 'react';
import { useRouter } from 'next/router';

import { useApiDataValue } from '../../src/data/apiData';
import GroupHeaderLayout from './GroupHeaderLayout';

const GroupHeader = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const source = `/groups/${groupId}`;
    const groupData = useApiDataValue('group',source);
    return <GroupHeaderLayout group={groupData}/>
}

export default GroupHeader;