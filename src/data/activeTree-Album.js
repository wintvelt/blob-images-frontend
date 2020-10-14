import { useEffect } from 'react';
import { API } from 'aws-amplify';

import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { activeAlbumIdState, activeGroupIdState } from './activeTreeRoot';

// active album
export const activeAlbumData = atom({
    key: 'activeAlbumData',
    default: { isLoading: true }
});


export const albumToForm = (album) => ({
    groupId: album.PK.slice(2),
    albumId: album.SK,
    name: album.name,
    image: {
        url: album.photo?.url,
        photoId: album.photoId
    },
    group: album.group,
    userIsAdmin: album.userIsAdmin,
    newPicsCount: album.newPicsCount
});

export const useReloadActiveAlbum = () => {
    const activeGroupId = useRecoilValue(activeGroupIdState);
    const activeAlbumId = useRecoilValue(activeAlbumIdState);
    const setActiveAlbum = useSetRecoilState(activeAlbumData);
    const loadData = async () => {
        console.log(`loading active album ${activeAlbumId}`);
        try {
            const album = (activeAlbumId) ?
                await API.get('blob-images', `/groups/${activeGroupId}/albums/${activeAlbumId}`)
                : {};
            setActiveAlbum({ contents: albumToForm(album) });
        } catch (error) {
            setActiveAlbum({ hasError: error });
        }
    }
    return loadData;
}

export const useActiveAlbum = () => {
    const activeAlbumId = useRecoilValue(activeAlbumIdState);
    const activeAlbum = useRecoilValue(activeAlbumData);
    const reloadAlbum = useReloadActiveAlbum();
    useEffect(() => {
        if (!activeAlbum.contents?.id || activeAlbum.contents?.id !== activeAlbumId) {
            reloadAlbum();
        };
    }, [activeAlbumId]);
    return activeAlbum;
};

export const useActiveAlbumValue = () => {
    const activeAlbum = useRecoilValue(activeAlbumData);
    return activeAlbum;
};

const saveAlbum = async (groupId, albumId, albumFields) => {
    let albumUpdate = {
        name: albumFields.name,
        photoFilename: albumFields.image?.url && albumFields.image.url.split('/')[2]
    };
    if (albumFields.image?.photoId) albumUpdate.photoId = albumFields.image.photoId;
    if (!albumUpdate.photoFilename && !albumUpdate.photoId) albumUpdate.photoId = '';
    const isNew = !albumId || albumId === 'new';
    const result = (isNew) ?
        await API.post('blob-images', `/groups/${groupId}/albums`, {
            body: albumUpdate
        }) :
        await API.put('blob-images', `/groups/${groupId}/albums/${albumId}`, {
            body: albumUpdate
        });
    return result;
};

export const useSaveAlbum = () => {
    const setActiveAlbum = useSetRecoilState(activeAlbumData);
    const groupId = useRecoilValue(activeGroupIdState);
    const saveAlbumFunc = async (albumId, albumFields) => {
        let newAlbumId = null;
        try {
            const result = await saveAlbum(groupId, albumId, albumFields);
            newAlbumId = result.SK;
            setActiveAlbum({ contents: albumToForm(result) });
        } catch (error) {
            setActiveAlbum({ hasError: 'could not save album changes' });
            console.log(error);
        }
        return newAlbumId;
    }
    return saveAlbumFunc;
}
export const deleteAlbum = async (groupId, albumId) => {
    const result = await API.del('blob-images', `/groups/${groupId}/albums/${albumId}`);
    return result;
};

// export const redirectOnAlbumLoadError = () => {
//     const { enqueueSnackbar } = useSnackbar();
//     const redirect = useSetLoadingPath();
//     const groupData = useRecoilValueLoadable(activeGroupState);
//     const hasGroupError = (groupData.state === 'hasError');
//     const albumData = useRecoilValueLoadable(activeAlbumState);
//     const hasAlbumError = (albumData.state === 'hasError');
//     useEffect(() => {
//         if (hasGroupError) {
//             enqueueSnackbar('Could not load group, please try again', { variant: 'error' });
//             redirect('/personal/groups');
//         } else if (groupData.state === 'hasValue' && hasAlbumError) {
//             enqueueSnackbar('Could not load album, please try again', { variant: 'error' });
//             redirect(`/personal/groups/${group.id}`);
//         }
//     }, [hasGroupError, hasAlbumError]);
// };