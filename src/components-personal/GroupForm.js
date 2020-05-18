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

const GroupForm = ({group}) => {
    const onSubmit = async (e) => {
        alert('submitted');
    }

    return (
        <Form
            title='Edit group details'
            formFields={fieldConfig}
            initialValues={group}
            isLoading={false}
            submitText='Save changes'
            onSubmit={onSubmit}
            onDelete={() => { }}
            deleteText='delete this group'
        />
    )
};

export default GroupForm