import React from 'react';
import { useRouter } from 'next/router';

import { useApiData } from '../../src/components-generic/DataProvider';
import GroupCardLayout from './GroupCardLayout';

const GroupCard = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const source = `/groups/${groupId}`;
    const groupData = useApiData('group', source);
    const group = groupData.data || {};
    return <GroupCardLayout {...group} isLoading={groupData.isLoading} />
}

export default GroupCard;