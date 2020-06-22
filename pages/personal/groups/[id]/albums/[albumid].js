import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';

import AlbumHeader from '../../../../../src/components-personal/AlbumHeader';
import PhotoList from '../../../../../src/components-personal/PhotoList';
import PrivatePage from '../../../../../src/components-personal/PrivatePage';
import { useApiData } from '../../../../../src/data/apiData';
import Upload from '../../../../../src/components-generic/Upload';

const AlbumMain = () => {
    const router = useRouter();
    const groupId = router.query.id;
    const albumId = router.query.albumid;
    const photoMetaData = { groupId, albumId };
    const pond = useRef();
    const albumUrl = `/groups/${groupId}/albums/${albumId}`;
    const album = useApiData('album', albumUrl);
    const albumData = album.data;
    const { reloadData } = useApiData('albumPhotos', albumUrl + '/photos')
    const [files, setFiles] = useState([]);

    const onAddFile = (_, file) => {
        setFiles([...new Set([...files, file.filename])]);
    }
    const onRemoveFile = (_, file) => {
        setFiles(files.filter(filename => filename !== file.filename));
    }
    const onProcessFile = async (err, file) => {
        setTimeout(async () => {
            reloadData();
            pond.current.removeFile(file.id);
        }, 1000)
    }


    return (
        <main>
            <AlbumHeader />
            <PhotoList apiKey='albumPhotos' source={albumUrl + '/photos'}
                menu={albumData && albumData.userIsAdmin}
                select={true}
                album={album}
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