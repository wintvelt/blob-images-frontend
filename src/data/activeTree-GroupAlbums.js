import { useEffect } from 'react';
import { API } from 'aws-amplify';

import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { activeGroupIdState } from './activeTreeRoot';
import { albumToForm } from './activeTree-Album';

// active album
export const activeGroupAlbumData = atom({
    key: 'activeGroupAlbumData',
    default: { isLoading: true }
});
export const useReloadActiveGroupAlbums = () => {
    const activeGroupId = useRecoilValue(activeGroupIdState);
    const setActiveGroupAlbums = useSetRecoilState(activeGroupAlbumData);
    const loadData = async () => {
        console.log(`loading active group ${activeGroupId} albums`);
        try {
            const albums = (activeGroupId) ?
                await API.get('blob-images', `/groups/${activeGroupId}/albums`)
                : [];
            setActiveGroupAlbums({ contents: 
                albums.map(album => albumToForm(album))
            });
        } catch (error) {
            setActiveGroupAlbums({ hasError: error });
        }
    }
    return loadData;
}

export const useActiveGroupAlbums = () => {
    const activeGroupId = useRecoilValue(activeGroupIdState);
    const activeGroupAlbums = useRecoilValue(activeGroupAlbumData);
    const reloadAlbums = useReloadActiveGroupAlbums();
    useEffect(() => {
        if (activeGroupId) {
            reloadAlbums();
        };
    }, [activeGroupId]);
    return activeGroupAlbums;
};

export const useActiveGroupAlbumsValue = () => {
    const activeGroupAlbums = useRecoilValue(activeGroupAlbumData);
    return activeGroupAlbums;
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