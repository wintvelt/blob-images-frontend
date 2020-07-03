import { useEffect } from 'react';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import { atom, selector, useRecoilValueLoadable, DefaultValue } from 'recoil';
import { activeGroupIdState, activeAlbumIdState } from './activeTreeRoot';
import { useSetLoadingPath } from './loadingData';

const activeAlbumStateTrigger = atom({
    key: 'activeAlbumStateTrigger',
    default: 0,
});

export const activeAlbumState = selector({
    key: 'activeAlbum',
    get: async ({ get }) => {
        get(activeGroupStateTrigger);
        const groupId = get(activeGroupIdState);
        const albumId = get(activeAlbumIdState);
        if (!groupId || !albumId) return undefined;
        const source = `/groups/${groupId}/albums/${albumId}`;
        const response = await API.get('blob-images', source);
        if (response.error) {
            throw response.error;
        }
        return response;
    },
    set: ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            set(activeAlbumStateTrigger, v => v + 1);
        }
    }
});

export const activeGroupAlbums = selector({
    key: 'activeGroupAlbums',
    get: async ({ get }) => {
        get(activeAlbumStateTrigger);
        const groupId = get(activeGroupIdState);
        if (!groupId) return [];
        const source = `/groups/${groupId}/albums`;
        const response = await API.get('blob-images', source);
        if (response.error) {
            throw response.error;
        }
        return response;
    }
});



// helper to check for data in Loadable - sometimes state == hasValue, but contents == undefined
// if groupId not (yet) in recoil datatree
export const hasAlbumData = (loadable) => (
    (loadable.state === 'hasValue') && loadable.contents
);

export const redirectOnAlbumLoadError = () => {
    const { enqueueSnackbar } = useSnackbar();
    const redirect = useSetLoadingPath();
    const groupData = useRecoilValueLoadable(activeGroupState);
    const hasGroupError = (groupData.state === 'hasError');
    const albumData = useRecoilValueLoadable(activeAlbumState);
    const hasAlbumError = (albumData.state === 'hasError');
    useEffect(() => {
        if (hasGroupError) {
            enqueueSnackbar('Could not load group, please try again', { variant: 'error' });
            redirect('/personal/groups');
        } else if (groupData.state === 'hasValue' && hasAlbumError) {
            enqueueSnackbar('Could not load album, please try again', { variant: 'error' });
            redirect(`/personal/groups/${group.id}`);
        }
    }, [hasGroupError, hasAlbumError]);
};