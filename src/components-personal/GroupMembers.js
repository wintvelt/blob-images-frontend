import React from 'react';
import { useRouter } from 'next/router';

import { useApiData } from '../../src/components-generic/DataProvider';
import GroupMembersLayout from './GroupMembersLayout';

const GroupMembers = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const source = `myUrl/getMembers/${groupId}`;
    const members = useApiData('members', source);
    return <GroupMembersLayout members={members} />
}

export default GroupMembers;