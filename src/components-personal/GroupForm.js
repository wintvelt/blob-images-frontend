import React, { useState } from 'react';
import { API } from 'aws-amplify';

import Form from '../components-generic/Form';
import { useRouter } from 'next/router';

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
    const router = useRouter();
    const [loading, setLoading] = useState({ isLoading: false });
    const onSubmit = async (fields) => {
        setLoading({ isLoading: true });
        try {
            if (isNew) {
                const result = await API.post('blob-images', '/groups', {
                    body: fields
                });
                const groupId = result.SK;
                router.push('/personal/groups/[id]/edit', `/personal/groups/${groupId}/edit`);
            } else {
                alert('save update');
            }
            setLoading({ success: 'Successfully saved group', isLoading: false });
        } catch (e) {
            console.log(e.message);
            setLoading({ error: e.message, isLoading: false });
        }
    }
    const handleDelete = (e) => {
        alert('deleted');
    }
    const title = (isNew) ? 'Add details for your new group' : 'Edit group details';
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