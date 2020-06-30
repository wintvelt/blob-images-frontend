import { useEffect } from 'react';
import { atom, selector, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

const activeGroupState = atom({
    key: 'activeGroup',
    default: null
});

const activeAlbumState = atom({
    key: 'activeAlbum',
    default: null
});

const useActiveRoot = () => {
    const setActiveGroupId  = useSetRecoilState(activeGroupState);
    const setActiveAlbumId = useSetRecoilState(activeAlbumState);
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const albumId = router.query && router.query.albumid;
    useEffect(() => {
        console.log('setting root groupId')
        setActiveGroupId(groupId);
    },[groupId]);

    useEffect(() => {
        console.log('setting root albumId')
        setActiveAlbumId(albumId);
    },[groupId, albumId]); 
};

export default useActiveRoot;

