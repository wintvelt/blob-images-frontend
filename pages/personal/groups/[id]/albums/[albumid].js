import React, { useState, useRef } from 'react';

import AlbumHeader from '../../../../../src/components-personal/AlbumHeader';
import PhotoList from '../../../../../src/components-personal/PhotoList';
import PrivatePage from '../../../../../src/components-personal/PrivatePage';
import Upload from '../../../../../src/components-generic/Upload';
import { useRecoilValueLoadable, useResetRecoilState } from 'recoil';
import { activeAlbumState, hasAlbumData } from '../../../../../src/data/activeTree-Album';

const AlbumMain = () => {
    const activeAlbumData = useRecoilValueLoadable(activeAlbumState);
    const hasValue = hasAlbumData(activeAlbumData);
    const activeAlbum = hasValue? activeAlbumData.contents : {};
    const groupId = activeAlbum.PK?.slice(2);
    const albumId = activeAlbum.SK;
    const userIsAdmin = activeAlbumData.userIsAdmin;
    const photoMetaData = { groupId, albumId };
    const pond = useRef();
    const albumUrl = `/groups/${groupId}/albums/${albumId}`;
    const reloadPhotos = useResetRecoilState(activeAlbumState);
    const [files, setFiles] = useState([]);

    const onAddFile = (_, file) => {
        setFiles([...new Set([...files, file.filename])]);
    }
    const onRemoveFile = (_, file) => {
        setFiles(files.filter(filename => filename !== file.filename));
    }
    const onProcessFile = async (err, file) => {
        setTimeout(async () => {
            reloadPhotos();
            pond.current.removeFile(file.id);
        }, 1000)
    }


    return (
        <main>
            <AlbumHeader />
            <PhotoList apiKey='albumPhotos' source={albumUrl + '/photos'}
                menu={userIsAdmin}
                select={true}
                album={activeAlbum}
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