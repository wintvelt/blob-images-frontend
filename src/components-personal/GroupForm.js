import React, { useState } from 'react';

import Form from '../components-generic/Form';

const fieldConfig = {
    title: {
        autoComplete: 'group-title',
        type: 'text',
        label: 'group name',
        validations: [{
            text: 'please enter a name for this group',
            validate: (val) => (!!val),
        }],
    },
    subtitle: {
        autoComplete: 'group-subtitle',
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
    const onSubmit = async (e) => {
        if (isNew) {
            alert('create new');
        } else {
            alert('save update')
        }
    }
    const handleDelete = (e) => {
        alert('deleted');
    }
    const title = (isNew)? 'Add details for your new group' : 'Edit group details';
    const submitText = (isNew)? 'Save new group' : 'Save changes';
    const onDelete = (isNew)? undefined : handleDelete;

    return (
        <Form
            title={title}
            formFields={fieldConfig}
            initialValues={group}
            isLoading={false}
            submitText={submitText}
            onSubmit={onSubmit}
            onDelete={onDelete}
            deleteText='delete this group'
        />
    )
};

export default GroupForm