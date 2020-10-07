import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import Form from '../components-generic/Form';
import { useSetLoadingPath } from '../data/loadingData';
import { useRecoilValueLoadable, useResetRecoilState } from 'recoil';
import { userGroups } from '../data/userData';
import { activeGroupState } from '../data/activeTree-Group';

const fieldConfig = {
    name: {
        autoComplete: 'group-name',
        type: 'text',
        label: 'naam van de groep',
        validations: [{
            text: 'geef je groep een naam',
            validate: (val) => (!!val),
        }],
    },
    description: {
        autoComplete: 'group-description',
        type: 'text',
        label: 'omschrijving',
    },
    image: {
        autoComplete: 'group-image',
        type: 'image',
        isGroup: true,
        label: 'pic van de groep',
    },
};

const GroupForm = ({ group, isNew }) => {
    const groupId = group?.id;
    const setLoadingPath = useSetLoadingPath();
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const userGroupsData = useRecoilValueLoadable(userGroups);
    const groups = (userGroupsData.state === 'hasValue') ? userGroupsData.contents : [];
    const reloadGroup = useResetRecoilState(activeGroupState);
    const reloadUserGroups = useResetRecoilState(userGroups);

    const onSubmit = async (fields) => {
        setIsLoading(true);
        let groupUpdate = {
            name: fields.name,
            description: fields.description,
            photoFilename: fields.image.url && fields.image.url.split('/')[2]
        };
        if (fields.image.SK) groupUpdate.photoId = fields.image.photoId;
        try {
            const result = (isNew) ?
                await API.post('blob-images', '/groups', {
                    body: groupUpdate
                }) :
                await API.put('blob-images', `/groups/${groupId}`, {
                    body: groupUpdate
                });
            const newGroupId = result.SK;
            const message = (isNew) ?
                (groups && groups.length > 0) ?
                    'nieuwe groep gesticht'
                    : 'top! je hebt net je eerste groepp gemaakt'
                : 'wijzigingen opgeslagen';
            enqueueSnackbar(message, { variant: 'success' });
            if (isNew) {
                setLoadingPath(
                    '/personal/groups/[id]/albums/[albumid]/edit?new=true',
                    `/personal/groups/${newGroupId}/albums/new/edit?new=true`)
            } else {
                reloadGroup();
            };
            reloadUserGroups();
        } catch (e) {
            console.log(e.message);
            enqueueSnackbar('Er ging iets mis bij het opslaan', { variant: 'error' });
        }
        setIsLoading(false);
    }
    const handleDelete = (e) => {
        alert('fake deleted');
    }
    const title = (isNew && userGroupsData.state === 'hasValue') ?
        (groups && groups.length > 0) ?
            'Profiel van je nieuwe groep'
            : 'Richt je eerste groep op!'
        : 'Groepsprofiel aanpassen';
    const submitText = (isNew) ? 'Nieuwe groep opslaan' : 'Wijzigingen opslaan';
    const onDelete = (isNew) ? undefined : handleDelete;

    return (
        <Form
            title={title}
            formFields={fieldConfig}
            initialValues={group}
            isLoading={(!userGroupsData.state === 'hasValue') || isLoading}
            submitText={submitText}
            onSubmit={onSubmit}
            onDelete={onDelete}
            deleteText='verwijder deze groep'
        />
    )
};

export default GroupForm