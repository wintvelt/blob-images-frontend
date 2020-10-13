import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import Form from '../components-generic/Form';
import { useSetLoadingPath } from '../data/loadingData';
import { useRecoilValueLoadable, useResetRecoilState, useRecoilValue } from 'recoil';
import { activeGroupAlbums, activeAlbumState, useActiveAlbumValue, useReloadActiveAlbum, useSaveAlbum } from '../data/activeTree-Album';
import { activeGroupIdState, activeAlbumIdState } from '../data/activeTreeRoot';
import { useRouter } from 'next/router';
import { useActiveGroupAlbumsValue } from '../data/activeTree-GroupAlbums';

const fieldConfig = {
    name: {
        autoComplete: 'album-name',
        type: 'text',
        label: 'albumtitel',
        validations: [{
            text: 'voer een titel voor dit album in',
            validate: (val) => (!!val),
        }],
    },
    image: {
        autoComplete: 'album-image',
        type: 'image',
        isAlbum: true,
        label: 'albumcover',
    },
};

const AlbumForm = ({ album }) => {
    const groupId = useRecoilValue(activeGroupIdState);
    const albumId = useRecoilValue(activeAlbumIdState);
    const router = useRouter();
    const isNew = (router.query.albumid === 'new');
    const albumIdToSave = (isNew)? 'new': albumId;
    const isNewGroupFlow = router.query && router.query.new;
    const setLoadingPath = useSetLoadingPath();
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const albumsData = useActiveGroupAlbumsValue();
    const albums = albumsData.contents || [];
    const reloadActiveAlbum = useReloadActiveAlbum();
    const saveAlbum = useSaveAlbum();

    const onSubmit = async (fields) => {
        setIsLoading(true);
        try {
            const newAlbumId = await saveAlbum(albumIdToSave, fields);
            if (!newAlbumId) throw new Error('could not save album');
            const message = (isNew) ?
                (albums.length > 0) ?
                    'Nieuw album opgeslagen'
                    : 'Bravo! Je hebt je eerste album in deze groep gemaakt'
                : 'Wijzigingen opgeslagen';
            enqueueSnackbar(message, { variant: 'success' });
            reloadActiveAlbum();
            if (isNew) {
                if (isNewGroupFlow) {
                    setLoadingPath(
                        '/personal/groups/[id]/invite',
                        `/personal/groups/${groupId}/invite`)
                } else {
                    setLoadingPath(
                        '/personal/groups/[id]/albums/[albumid]',
                        `/personal/groups/${groupId}/albums/${newAlbumId}`)
                }
            } else {
                // reloadData();
            };
            // albums.reloadData();
        } catch (e) {
            console.log(e.message);
            enqueueSnackbar('Kon album niet opslaan', { variant: 'error' });
        }
        setIsLoading(false);
    }
    const handleDelete = (e) => {
        alert('deleted');
    }
    const title = (isNew) ?
        (albums.data && albums.data.length > 0) ?
            'Nieuw album'
            : 'Maak je eerste album in deze groep'
        : 'Album bewerken';
    const submitText = (isNew) ? 'Nieuw album opslaan' : 'Wijzigingen opslaan';
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
            deleteText='Album verwijderen'
        />
    )
};

export default AlbumForm;