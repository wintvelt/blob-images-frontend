import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import { atom, selector, useRecoilValueLoadable, DefaultValue } from 'recoil';
import { activeGroupIdState } from './activeTreeRoot';

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
    set: async ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            set(activeGroupStateTrigger, v => v + 1);
        }
    }
});

export const redirectOnGroupLoadError = () => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const groupData = useRecoilValueLoadable(activeGroupState);
    const hasError = (groupData.state === 'hasError');
    useEffect(() => {
        if (hasError) {
            enqueueSnackbar('Could not load this group, please try again', { variant: 'error' });
            router.push('/personal/groups');
        }
    }, [hasError]);
};