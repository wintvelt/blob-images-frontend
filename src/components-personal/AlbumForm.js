import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import Form from '../components-generic/Form';
import { useRouter } from 'next/router';
import { useApiData } from '../components-generic/DataProvider';

const fieldConfig = {
    name: {
        autoComplete: 'album-name',
        type: 'text',
        label: 'album name',
        validations: [{
            text: 'please enter a name for your album',
            validate: (val) => (!!val),
        }],
    },
    image: {
        autoComplete: 'album-image',
        type: 'image',
        isGroup: true,
        label: 'album image',
    },
};

const AlbumForm = ({ album }) => {
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const albumId = router.query && router.query.albumid;
    const isNew = (albumId === 'new');
    const baseUrl = `/groups/${groupId}/albums`;
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const albums = useApiData('albums', baseUrl, true);
    const { reloadData } = useApiData('album', `${baseUrl}/${albumId}`, true)

    const onSubmit = async (fields) => {
        setIsLoading(true);
        try {
            const result = (isNew) ?
                await API.post('blob-images', baseUrl, {
                    body: fields
                }) :
                await API.put('blob-images', `${baseUrl}/${albumId}`, {
                    body: fields
                });
            const newAlbumId = result.SK;
            const message = (isNew) ?
                (albums.data && albums.data.length > 0) ?
                    'new album created'
                    : 'congrats! you created your first album in this group.'
                : 'saved changes';
            enqueueSnackbar(message, { variant: 'success' });
            if (isNew) {
                router.push(
                    '/personal/groups/[id]/albums/[albumid]/edit', 
                    `/personal/groups/${groupId}/albums/${albumId}/edit`)
            } else {
                reloadData();
            };
            albums.reloadData();
        } catch (e) {
            console.log(e.message);
            enqueueSnackbar('Could not save album', { variant: 'error' });
        }
        setIsLoading(false);
    }
    const handleDelete = (e) => {
        alert('deleted');
    }
    const title = (isNew) ?
        (albums.data && albums.data.length > 0) ?
            'Add details for your new album'
            : 'Create the first album in this group'
        : 'Edit album details';
    const submitText = (isNew) ? 'Save new album' : 'Save changes';
    const onDelete = (isNew) ? undefined : handleDelete;

    return (
        <Form
            title={title}
            formFields={fieldConfig}
            initialValues={album}
            isLoading={isLoading}
            submitText={submitText}
            onSubmit={onSubmit}
            onDelete={onDelete}
            deleteText='delete this album'
        />
    )
};

export default AlbumForm