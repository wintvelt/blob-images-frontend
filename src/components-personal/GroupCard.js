import React from 'react';
import GroupCardLayout from './GroupCardLayout';
import { useRecoilValueLoadable } from 'recoil';
import { activeGroupState, hasGroupData } from '../data/activeTree-Group';

const GroupCard = () => {
    const groupData = useRecoilValueLoadable(activeGroupState);
    const hasValue = hasGroupData(groupData);
    const group = hasValue? groupData.contents : {};
    return <GroupCardLayout {...group} isLoading={!hasValue} />
}

export default GroupCard;