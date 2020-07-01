import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { useSnackbar } from 'notistack';

import Form from '../components-generic/Form';
import { useApiData } from '../data/apiData';
import { useSetLoadingPath } from '../data/loadingData';

const fieldConfig = {
    name: {
        autoComplete: 'group-name',
        type: 'text',
        label: 'group name',
        validations: [{
            text: 'please enter a name for this group',
            validate: (val) => (!!val),
        }],
    },
    description: {
        autoComplete: 'group-description',
        type: 'text',
        label: 'group description',
    },
    image: {
        autoComplete: 'group-image',
        type: 'image',
        isGroup: true,
        label: 'group image',
    },
};

const GroupForm = ({ group }) => {
    const groupId = group.id;
    const isNew = !groupId;
    const setLoadingPath = useSetLoadingPath();
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const groups = useApiData('groups', '/groups');
    const { reloadData } = useApiData('group', `/groups/${groupId}`);

    const onSubmit = async (fields) => {
        setIsLoading(true);
        try {
            const result = (isNew) ?
                await API.post('blob-images', '/groups', {
                    body: fields
                }) :
                await API.put('blob-images', `/groups/${groupId}`, {
                    body: fields
                });
            const newGroupId = result.SK;
            const message = (isNew) ?
                (groups.data && groups.data.length > 0) ?
                    'new group created'
                    : 'congrats! you created your first group.'
                : 'changes were saved';
            enqueueSnackbar(message, { variant: 'success' });
            if (isNew) {
                setLoadingPath(
                    '/personal/groups/[id]/albums/[albumid]/edit?new=true', 
                    `/personal/groups/${newGroupId}/albums/new/edit?new=true`)
            } else {
                reloadData();
            };
            groups.reloadData();
        } catch (e) {
            console.log(e.message);
            enqueueSnackbar('Could not save group', { variant: 'error' });
        }
        setIsLoading(false);
    }
    const handleDelete = (e) => {
        alert('deleted');
    }
    const title = (isNew) ?
        (groups.data && groups.data.length > 0) ?
            'Add details for your new group'
            : 'Create your first new group!'
        : 'Edit group details';
    const submitText = (isNew) ? 'Save new group' : 'Save changes';
    const onDelete = (isNew) ? undefined : handleDelete;

    return (
        <Form
            title={title}
            formFields={fieldConfig}
            initialValues={group}
            isLoading={isLoading}
            submitText={submitText}
            onSubmit={onSubmit}
            onDelete={onDelete}
            deleteText='delete this group'
        />
    )
};

export default GroupForm