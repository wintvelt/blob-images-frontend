import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import Form from '../components-generic/Form';
import { useSetLoadingPath } from '../data/loadingData';
import { useRecoilValueLoadable, useResetRecoilState, useRecoilValue } from 'recoil';
import { activeGroupAlbums, activeAlbumState } from '../data/activeTree-Album';
import { activeGroupIdState, activeAlbumIdState } from '../data/activeTreeRoot';
import { useRouter } from 'next/router';

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
        isAlbum: true,
        label: 'album image',
    },
};

const AlbumForm = ({ album }) => {
    const groupId = useRecoilValue(activeGroupIdState);
    const albumId = useRecoilValue(activeAlbumIdState);
    const isNew = (!albumId);
    const router = useRouter();
    const isNewGroupFlow = router.query && router.query.new;
    const setLoadingPath = useSetLoadingPath();
    const baseUrl = `/groups/${groupId}/albums`;
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const albumsData = useRecoilValueLoadable(activeGroupAlbums);
    const albums = (albumsData === 'hasValue' && albumsData.contents) ? albumsData.contents : [];
    const reloadActiveAlbum = useResetRecoilState(activeAlbumState);

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
            console.log({ isNew, baseUrl, result });
            const newAlbumId = result.SK;
            const message = (isNew) ?
                (albums.length > 0) ?
                    'new album created'
                    : 'congrats! you created your first album in this group.'
                : 'changes were saved';
            enqueueSnackbar(message, { variant: 'success' });
            reloadActiveAlbum();
            if (isNew) {
                if (isNewGroupFlow) {
                    setLoadingPath(
                        '/personal/groups/[id]/invite',
                        `/personal/groups/${groupId}/invite`)
                } else {
                    setLoadingPath(
                        '/personal/groups/[id]/albums/[albumid]/edit',
                        `/personal/groups/${groupId}/albums/${newAlbumId}/edit`)
                }
            } else {
                // reloadData();
            };
            // albums.reloadData();
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

export default AlbumForm;