import React from 'react';
import GroupCardLayout from './GroupCardLayout';
import { useRecoilValue } from 'recoil';
import { activeGroupData } from '../data/activeTree-Group';

const GroupCard = ({ hideNew }) => {
    const groupData = useRecoilValue(activeGroupData);
    const hasValue = !!groupData.contents;
    const group = hasValue ? groupData.contents : {};
    return <GroupCardLayout {...group} hideNew={hideNew} isLoading={!hasValue} />
}

export default GroupCard;