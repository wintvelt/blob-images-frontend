import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { atom, selector, useRecoilState } from 'recoil';

export const activeGroupIdState = atom({
    key: 'activeGroupId',
    default: undefined
});

export const activeAlbumIdState = atom({
    key: 'activeAlbumId',
    default: undefined
});

export const activePathFront = selector({
    key: 'activeUrlFront',
    get: ({ get }) => {
        const groupId = get(activeGroupIdState);
        const albumId = get(activeAlbumIdState);
        const path = (groupId) ?
            (albumId) ? '/personal/groups/[id]/albums/[albumid]' : '/personal/groups/[id]'
            : '/personal/groups';
        return {
            path,
            asPath: path.replace('[id]', groupId).replace('[albumid]', albumId),
        }
    }
})

const useActiveRoot = () => {
    const [activeGroupId, setActiveGroupId] = useRecoilState(activeGroupIdState);
    const [activeAlbumId, setActiveAlbumId] = useRecoilState(activeAlbumIdState);
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const albumId = router.query && router.query.albumid;
    useEffect(() => {
        const groupDidChange = (activeGroupId !== groupId);
        if (groupDidChange) {
            console.log(`setting root groupId from "${activeGroupId}" to "${groupId}"`)
            setActiveGroupId(groupId);
        }
    }, [groupId]);

    useEffect(() => {
        const groupDidChange = (activeGroupId !== groupId);
        const albumDidChange = (activeAlbumId !== albumId);
        if ((groupDidChange && activeAlbumId) || albumDidChange) {
            console.log(`setting root albumId from "${activeAlbumId}" to "${albumId}"`)
            setActiveAlbumId(albumId);
        }
    }, [groupId, albumId]);
};

export default useActiveRoot;