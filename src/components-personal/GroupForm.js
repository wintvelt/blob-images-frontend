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
                (groups && groups.length > 0) ?
                    'new group created'
                    : 'congrats! you created your first group.'
                : 'changes were saved';
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
            enqueueSnackbar('Could not save group', { variant: 'error' });
        }
        setIsLoading(false);
    }
    const handleDelete = (e) => {
        alert('fake deleted');
    }
    const title = (isNew && userGroupsData.state === 'hasValue') ?
        (groups && groups.length > 0) ?
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
            isLoading={(!userGroupsData.state === 'hasValue') || isLoading}
            submitText={submitText}
            onSubmit={onSubmit}
            onDelete={onDelete}
            deleteText='delete this group'
        />
    )
};

export default GroupForm