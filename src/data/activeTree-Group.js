import { useEffect } from 'react';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import { atom, selector, useRecoilValueLoadable, DefaultValue } from 'recoil';
import { activeGroupIdState } from './activeTreeRoot';
import { useSetLoadingPath } from './loadingData';

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
        const groupId = get(activeGroupIdState);
        if (!groupId) return [];
        const source = `/groups/${groupId}/members`;
        const response = await API.get('blob-images', source);
        if (response.error) {
            throw response.error;
        }
        const members = response.map(member => ({
            ...member.user,
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


export const redirectOnGroupLoadError = () => {
    const { enqueueSnackbar } = useSnackbar();
    const redirect = useSetLoadingPath();
    const groupData = useRecoilValueLoadable(activeGroupState);
    const hasError = (groupData.state === 'hasError');
    useEffect(() => {
        if (hasError) {
            enqueueSnackbar('Could not load this group, please try again', { variant: 'error' });
            redirect('/personal/groups');
        }
    }, [hasError]);
};