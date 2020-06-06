import React from 'react';
import { useRouter } from 'next/router';

import { useApiDataValue } from '../../src/data/apiData';
import GroupCardLayout from './GroupCardLayout';

const GroupCard = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const source = `/groups/${groupId}`;
    const groupData = useApiDataValue('group', source);
    const group = groupData.data || {};
    return <GroupCardLayout {...group} isLoading={groupData.isLoading} />
}

export default GroupCard;