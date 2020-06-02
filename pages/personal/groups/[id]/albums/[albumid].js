import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';

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
    const album = useApiData('album', `/groups/${groupId}/albums/${albumId}`);
    const { reloadData} = useApiData('myPhotos', '/photos', true)
    const [files, setFiles] = useState([]);
    const onSave = async () => {
        await pond.current.processFiles();
        if (file) {
            const newImage = {
                image: 'protected/'+ profile.id + '/' + file,
                owner: profile
            }
            reloadData();
            onChange(newImage);
        } else {
            handleClose();
        };
    }
    const onAddFile = (_, file) => {
        setFiles([...new Set([...files, file.filename])]);
    }
    const onRemoveFile = (_, file) => {
        setFiles(files.filter(filename => filename !== file.filename));
    }
    const onProcessFile = async (err, file) => {
        if (err) console.log(err);
        await reloadData();
        pond.current.removeFile(file.id);
    }


    return (
        <main>
            <AlbumHeader />
            <PhotoList apiKey='myPhotos' source='/photos' menu={album.data && album.data.userIsAdmin} />
            {JSON.stringify(files,null,2)}
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