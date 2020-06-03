import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';

import AlbumHeader from '../../../../../src/components-personal/AlbumHeader';
import PhotoList from '../../../../../src/components-personal/PhotoList';
import PrivatePage from '../../../../../src/components-personal/PrivatePage';
import { useApiData } from '../../../../../src/components-generic/DataProvider';
import Upload from '../../../../../src/components-generic/Upload';

const AlbumMain = () => {
    const router = useRouter();
    const groupId = router.query.id;
    const albumId = router.query.albumid;
    const pond = useRef();
    const albumUrl = `/groups/${groupId}/albums/${albumId}`;
    const album = useApiData('album', albumUrl);
    const { reloadData } = useApiData('albumPhotos', albumUrl + '/photos', true)
    const [files, setFiles] = useState([]);

    const onAddFile = (_, file) => {
        setFiles([...new Set([...files, file.filename])]);
    }
    const onRemoveFile = (_, file) => {
        setFiles(files.filter(filename => filename !== file.filename));
    }
    const onProcessFile = async (err, file) => {
        if (err) console.log(err);
        await reloadData();
        API.post('blob-images',`/groups/${groupId}/albums/${albumId}/photos`, {
            body: { filename: file.filename }
        });
        pond.current.removeFile(file.id);
    }


    return (
        <main>
            <AlbumHeader />
            <PhotoList apiKey='albumPhotos' source={albumUrl + '/photos'}
                menu={album.data && album.data.userIsAdmin}
                select={true}
            />
            <Upload pond={pond} allowMultiple={true} allowImagePreview={true} instantUpload={true}
                onAddFile={onAddFile} onRemoveFile={onRemoveFile}
                onProcessFile={onProcessFile}
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