import { useEffect } from 'react';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import { atom, selector, useRecoilValue, DefaultValue, useSetRecoilState } from 'recoil';
import { activeGroupIdState } from './activeTreeRoot';
import { useSetLoadingPath } from './loadingData';
import { userData } from './userData';

const memberToForm = (member) => ({
    userId: member.SK,
    createdAt: member.createdAt,
    name: member.name,
    email: member.email,
    isFounder: member.isFounder,
    image: {
        photoId: member.photoId,
        url: member.photoUrl,
    },
    userRole: member.userRole,
    status: member.status,
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

// const saveGroup = async (groupId, groupFields) => {
//     let groupUpdate = {
//         name: groupFields.name,
//         description: groupFields.description,
//         photoFilename: groupFields.image.url && groupFields.image.url.split('/')[2]
//     };
//     if (groupFields.image.photoId) groupUpdate.photoId = groupFields.image.photoId;
//     if (!groupUpdate.photoFilename && !groupUpdate.photoId) groupUpdate.photoId = '';
//     const isNew = !groupId;
//     const result = (isNew) ?
//         await API.post('blob-images', '/groups', {
//             body: groupUpdate
//         }) :
//         await API.put('blob-images', `/groups/${groupId}`, {
//             body: groupUpdate
//         });
//     return result;
// };

// export const useSaveGroup = () => {
//     const setActiveGroup = useSetRecoilState(activeGroupData);
//     const saveGroupFunc = async (groupId, groupFields) => {
//         let newGroupId = null;
//         try {
//             const result = await saveGroup(groupId, groupFields);
//             newGroupId = result.SK;
//             setActiveGroup({ contents: groupToForm(result) });
//         } catch (error) {
//             setActiveGroup({ hasError: 'could not save group changes' });
//         }
//         return newGroupId;
//     }
//     return saveGroupFunc;
// }
// export const deleteGroup = async (groupId) => {
//     const result = await API.del('blob-images', `/groups/${groupId}`);
//     return result;
// };