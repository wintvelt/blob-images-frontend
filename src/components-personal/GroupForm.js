import React, { useState } from 'react';
import { API } from 'aws-amplify';

import Form from '../components-generic/Form';
import { useRouter } from 'next/router';
import { useApiData } from '../components-generic/DataProvider';

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
    const router = useRouter();
    const groupId = router.query && router.query.id;
    const isNew = (groupId === 'new');
    const [loading, setLoading] = useState({ isLoading: false });
    const groups = useApiData('groups', '/groups', true);
    const { reloadData } = useApiData('group', `/groups/${groupId}`, true)

    const onSubmit = async (fields) => {
        setLoading({ isLoading: true });
        try {
            const result = (isNew) ?
                await API.post('blob-images', '/groups', {
                    body: fields
                }) :
                await API.put('blob-images', `/groups/${groupId}`, {
                    body: fields
                });
            const newGroupId = result.SK;
            if (isNew) {
                router.push('/personal/groups/[id]/edit', `/personal/groups/${newGroupId}/edit`)
            } else {
                reloadData();
            };
            groups.reloadData();

            setLoading({ success: 'Successfully saved group', isLoading: false });
        } catch (e) {
            console.log(e.message);
            setLoading({ error: e.message, isLoading: false });
        }
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
            loading={loading}
            submitText={submitText}
            onSubmit={onSubmit}
            onDelete={onDelete}
            deleteText='delete this group'
        />
    )
};

export default GroupForm