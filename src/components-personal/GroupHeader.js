import React from 'react';
import { useRouter } from 'next/router';

import { useApiData } from '../../src/components-generic/DataProvider';
import GroupHeaderLayout from './GroupHeaderLayout';

const GroupHeader = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const source = `myUrl/getGroup/${groupId}`;
    const groupData = useApiData('group',source);
    return <GroupHeaderLayout group={groupData}/>
}

export default GroupHeader;