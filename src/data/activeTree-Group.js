import { useEffect } from 'react';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import { atom, selector, useRecoilValue, useRecoilValueLoadable, DefaultValue, useSetRecoilState } from 'recoil';
import { activeGroupIdState } from './activeTreeRoot';
import { useSetLoadingPath } from './loadingData';
import { userData } from './userData';

export const activeGroupData = atom({
    key: 'activeGroupData',
    default: { isLoading: true }
});

const groupToForm = (group) => ({
    id: group.SK,
    name: group.name,
    description: group.description,
    image: {
        url: group.photo?.url,
        photoId: group.photoId
    },
    userRole: group.userRole,
    isFounder: group.isFounder
});

export const useReloadActiveGroup = () => {
    const activeGroupId = useRecoilValue(activeGroupIdState);
    const setActiveGroup = useSetRecoilState(activeGroupData);
    const loadData = async () => {
        console.log(`loading active group ${activeGroupId}`);
        try {
            const group = (activeGroupId) ?
                await API.get('blob-images', `/groups/${activeGroupId}`)
                : {};
            setActiveGroup({ contents: groupToForm(group) });
        } catch (error) {
            setActiveGroup({ hasError: error });
        }
    }
    return loadData;
}

export const useActiveGroup = () => {
    const activeGroupId = useRecoilValue(activeGroupIdState);
    const activeGroup = useRecoilValue(activeGroupData);
    const reloadGroup = useReloadActiveGroup();
    useEffect(() => {
        reloadGroup();
    }, [activeGroupId]);
    return activeGroup;
};

export const useActiveGroupValue = () => {
    const activeGroup = useRecoilValue(activeGroupData);
    return activeGroup;
};

const saveGroup = async (groupId, groupFields) => {
    let groupUpdate = {
        name: groupFields.name,
        description: groupFields.description,
        photoFilename: groupFields.image.url && groupFields.image.url.split('/')[2]
    };
    if (groupFields.image.photoId) groupUpdate.photoId = groupFields.image.photoId;
    if (!groupUpdate.photoFilename && !groupUpdate.photoId) groupUpdate.photoId = '';
    const isNew = !groupId;
    const result = (isNew) ?
        await API.post('blob-images', '/groups', {
            body: groupUpdate
        }) :
        await API.put('blob-images', `/groups/${groupId}`, {
            body: groupUpdate
        });
    return result;
};

export const useSaveGroup = () => {
    const setActiveGroup = useSetRecoilState(activeGroupData);
    const saveGroupFunc = async (groupId, groupFields) => {
        let newGroupId = null;
        try {
            const result = await saveGroup(groupId, groupFields);
            newGroupId = result.SK;
            setActiveGroup({ contents: groupToForm(result)});
        } catch (error) {
            setActiveGroup({ hasError: 'could not save group changes'});
        }
        return newGroupId;
    }
    return saveGroupFunc;
}
export const deleteGroup = async (groupId) => {
    const result = await API.del('blob-images', `/groups/${groupId}`);
    return result;
};

export const redirectOnGroupLoadError = (groupData, withEdit) => {
    const { enqueueSnackbar } = useSnackbar();
    const redirect = useSetLoadingPath();
    const hasError = (groupData?.hasError);
    const unAuthEdit = (withEdit && groupData?.contents && groupData.contents.userRole === 'guest');
    useEffect(() => {
        if (hasError) {
            enqueueSnackbar('Kon deze groep niet laden, probeer het nog eens..', { variant: 'error' });
            redirect('/personal/groups');
        }
    }, [hasError]);
    useEffect(() => {
        if (unAuthEdit) {
            enqueueSnackbar('Als gast van deze groep mag je geen aanpassingen doen,', { variant: 'error' });
            redirect(
                '/personal/groups/[id]',
                `/personal/groups/${newGroupId}`
            );
        }
    }, [unAuthEdit]);
};

const activeGroupStateTrigger = atom({
    key: 'activeGroupStateTrigger',
    default: 0,
});

export const activeGroupState = selector({
    key: 'activeGroup',
    get: async ({ get }) => {
        get(activeGroupStateTrigger);
        const groupId = get(activeGroupIdState);
        if (!groupId) return undefined;
        const source = `/groups/${groupId}`;
        const response = await API.get('blob-images', source);
        if (response.error) {
            throw response.error;
        }
        return response;
    },
    set: ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            set(activeGroupStateTrigger, v => v + 1);
        }
    }
});


// helper to check for data in Loadable - sometimes state == hasValue, but contents == undefined
// if groupId not (yet) in recoil datatree
export const hasGroupData = (loadable) => (
    (loadable.state === 'hasValue') && loadable.contents
);


const activeGroupMembersTrigger = atom({
    key: 'activeGroupMembersTrigger',
    default: 0,
});

export const activeGroupMembers = selector({
    key: 'activeGroupMembers',
    get: async ({ get }) => {
        get(activeGroupMembersTrigger);
        get(userData);
        const groupId = get(activeGroupIdState);
        if (!groupId) return [];
        const source = `/groups/${groupId}/members`;
        const response = await API.get('blob-images', source);
        if (response.error) {
            throw response.error;
        }
        const members = response.map(member => ({
            ...member.user,
            SK: member.SK,
            PK: member.PK,
            role: member.role,
            status: member.status,
            createdAt: member.createdAt,
        }));
        return members;
    },
    set: ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            set(activeGroupMembersTrigger, v => v + 1);
        }
    }
});