import { useEffect } from 'react';
import { API } from 'aws-amplify';

import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { activeGroupIdState } from './activeTreeRoot';
import { useSetLoadingPath } from './loadingData';
import { userData } from './userData';

const memberToForm = (member) => ({
    userId: member.PK.slice(2),
    createdAt: member.createdAt,
    name: member.name,
    email: member.email,
    isFounder: member.isFounder,
    isCurrent: member.isCurrent,
    image: {
        photoId: member.photoId,
        url: member.photoUrl,
    },
    userRole: member.userRole,
    status: member.status,
    options: member.options,
    visitDateLast: member.visitDateLast
});

// Members of active group
export const activeMembersData = atom({
    key: 'activeMembersData',
    default: { isLoading: true }
});

const memberSort = (a, b) => (
    (a.name < b.name) ? -1
        : (a.name > b.name) ? 1
            : 0
);

export const useReloadActiveMembers = () => {
    const activeGroupId = useRecoilValue(activeGroupIdState);
    const setActiveMembers = useSetRecoilState(activeMembersData);
    const loadData = async () => {
        console.log(`loading members from ${activeGroupId}`);
        try {
            const membersRaw = (activeGroupId) ?
                await API.get('blob-images', `/groups/${activeGroupId}/members`)
                : [];
            const members = membersRaw
                .sort(memberSort)
                .map(mem => memberToForm(mem));
            setActiveMembers({ contents: members });
        } catch (error) {
            setActiveMembers({ hasError: error });
        }
    }
    return loadData;
}

export const useActiveMembers = () => {
    const activeGroupId = useRecoilValue(activeGroupIdState);
    const activeMembers = useRecoilValue(activeMembersData);
    const reloadMembers = useReloadActiveMembers();
    useEffect(() => {
        if (activeGroupId) reloadMembers();
    }, [activeGroupId]);
    return activeMembers;
};

export const useMembersValue = () => {
    const activeMembers = useRecoilValue(activeMembersData);
    return activeMembers;
};

const saveMember = async (groupId, memberId, newRole) => {
    let memberUpdate = {
        newRole
    };
    const apiPath = `/groups/${groupId}/membership/${memberId}`;
    const result = await API.put('blob-images', apiPath, {
        body: memberUpdate
    });
    return result;
};
const deleteMember = async (groupId, memberId) => {
    const apiPath = `/groups/${groupId}/membership/${memberId}`;
    const result = await API.del('blob-images', apiPath);
    return result;
}

export const useMemberUpdate = () => {
    const groupId = useRecoilValue(activeGroupIdState);
    const reloadMembers = useReloadActiveMembers();
    const saveMemberFunc = async (memberId, newRole) => {
        try {
            const result = await saveMember(groupId, memberId, newRole);
            reloadMembers();
        } catch (error) {
            return { hasError: error };
        }
        return { success: true };
    };
    const deleteMemberFunc = async (memberId) => {
        try {
            const result = await deleteMember(groupId, memberId);
            reloadMembers();
        } catch (error) {
            return { hasError: error };
        }
        return { success: true };
    }
    return {
        save: saveMemberFunc,
        delete: deleteMemberFunc
    };
};