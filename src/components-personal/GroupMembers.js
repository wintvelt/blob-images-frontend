import React from 'react';
import { useRouter } from 'next/router';

import { useApiDataValue } from '../../src/data/apiData';
import GroupMembersLayout from './GroupMembersLayout';

const GroupMembers = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const source = `/groups/${groupId}/members`;
    const membersData = useApiDataValue('members', source);
    const members = membersData.data || [];
    return <GroupMembersLayout members={members} isLoading={members.isLoading} />
}

export default GroupMembers;