import React, { useState, useRef } from 'react';

import AlbumHeader from '../../../../../src/components-personal/AlbumHeader';
import PhotoList from '../../../../../src/components-personal/PhotoList';
import PrivatePage from '../../../../../src/components-personal/PrivatePage';
import Upload from '../../../../../src/components-generic/Upload';
import { useRecoilValueLoadable, useResetRecoilState } from 'recoil';
import { activeAlbumState, hasAlbumData, activeAlbumPhotos } from '../../../../../src/data/activeTree-Album';
import { useSetLoadingPath } from '../../../../../src/data/loadingData';

const AlbumMain = () => {
    const activeAlbumData = useRecoilValueLoadable(activeAlbumState);
    const hasValue = hasAlbumData(activeAlbumData);
    const activeAlbum = hasValue ? activeAlbumData.contents : {};
    const albumPhotosData = useRecoilValueLoadable(activeAlbumPhotos);
    const groupId = activeAlbum.PK?.slice(2);
    const albumId = activeAlbum.SK;
    const userIsAdmin = activeAlbum.userIsAdmin;
    const photoMetaData = { groupId, albumId };
    const pond = useRef();
    const reloadPhotos = useResetRecoilState(activeAlbumPhotos);
    const reloadAlbum = useResetRecoilState(activeAlbumState);
    const [files, setFiles] = useState([]);
    const setLoadingPath = useSetLoadingPath();

    const onAddFile = (_, file) => {
        setFiles([...new Set([...files, file.filename])]);
    }
    const onRemoveFile = (_, file) => {
        setFiles(files.filter(filename => filename !== file.filename));
    }
    const onProcessFile = async (err, file) => {
        setTimeout(async () => {
            pond.current.removeFile(file.id);
            reloadPhotos();
        }, 2000)
    }
    const onPhotoClick = (photo) => {
        const photoPath = '/personal/groups/[id]/albums/[albumid]/photos/[photoid]';
        setLoadingPath(
            photoPath,
            photoPath.replace('[photoid]', photo.key).replace('[id]', groupId).replace('[albumid]', albumId));
    };

    return (
        <main>
            <AlbumHeader />
            <PhotoList
                menu={userIsAdmin}
                select={false}
                onClick={onPhotoClick}
                album={activeAlbum}
                photoData={albumPhotosData}
                reloadPhotos={reloadPhotos}
                reloadAlbum={reloadAlbum}
            />
            <Upload pond={pond} allowMultiple={true} allowImagePreview={true} instantUpload={true}
                onAddFile={onAddFile} onRemoveFile={onRemoveFile}
                onProcessFile={onProcessFile}
                photoMetadata={photoMetaData}
            />
        </main>
    )
}

const AlbumPage = () => {
    return <PrivatePage>
        <AlbumMain />
    </PrivatePage>
}

export default AlbumPage;