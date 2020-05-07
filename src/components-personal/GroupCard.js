import React from 'react';
import { useRouter } from 'next/router';

import { useApiData } from '../../src/components-generic/DataProvider';
import GroupCardLayout from './GroupCardLayout';

const GroupCard = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const source = `myUrl/getGroup/${groupId}`;
    const groupData = useApiData('group', source);
    return <GroupCardLayout group={groupData} />
}

export default GroupCard;