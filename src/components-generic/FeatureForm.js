import React, { useState } from 'react';

import Form from '../components-generic/Form';
import { useFeaturesAPI } from '../data/featuresData';
import { errorLog } from '../helpers/errorLog';

const fieldConfig = {
    title: {
        autoComplete: 'none', type: 'text', label: 'Wens',
        validations: [{
            text: 'doe een wens (en vul deze in)',
            validate: (val) => (!!val),
        }],
    },
    description: {
        autoComplete: 'none', type: 'text', label: 'Eventuele langere omschrijving',
        multiline: true, rows: 3, rowsMax: 5,
        validations: [],
    },
};

const FeatureForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const featuresAPI = useFeaturesAPI();

    const handleSubmit = async (fields) => {
        setIsLoading(true);
        const { title, description } = fields;
        // make API call
        const result = await featuresAPI.add({title, description});
        console.log(result);
        setIsLoading(false);
    };

    const Message = ({ error }) => {
        errorLog(error);
        return <>
            Hmm, er ging hier iets mis
        </>
    };
    return <Form
        title={props.title}
        subtitle={props.subtitle}
        formFields={fieldConfig}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        submitText='Versturen'
        Message={(false) ? <Message error={''} /> : null}
        noPaper
    />
};

export default FeatureForm;