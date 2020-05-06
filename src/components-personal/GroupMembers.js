import React from 'react';
import { useRouter } from 'next/router';

import GroupMembersLayout from './GroupMembersLayout';

const GroupMembers = () => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const source = { members: [
        { name: 'LJ van Berkestijn', avatar: ''},
        { name: 'Paul Botje', avatar: ''},
        { name: 'Dave del Canho', avatar: ''},
        { name: 'Wouter In \'t Velt', avatar: '/img/me.jpg'},
        { name: 'Fred Kleiterp', avatar: ''},
        { name: 'Michiel Ebeling', avatar: ''},
    ]};
    return <GroupMembersLayout source={source} />
}

export default GroupMembers;