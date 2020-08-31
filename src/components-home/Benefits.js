import React from 'react';
import FeatureBlock from './FeatureBlock';

const featureList = [
    {
        icon: 'verified_user',
        title: 'Safe',
        descriptions: [
            'Your photos will always be visible only to you and the ones you trust. ' +
            ' Share them with your friends, your family, ' +
            'or with your team. Safely and securily stored in a trusted environment.'
        ]
    },
    {
        icon: 'touch_app',
        title: 'Simple',
        descriptions: [
            'Just photos. No ads, no spam, clutter. Simple drag and drop. Easy upload and download. ' +
            'Straightforward sharing. The basics you need, and nothing else.'
        ]
    },
    {
        icon: 'person_pin',
        title: 'Personal',
        descriptions: [
            'Make it your own. Add albums, titles, and pick favorites. ' +
            'The people you invite get a personal message, to join just your group. ' +
            'No need for everyone to be on whatever social platform.'
        ]
    },
]

const Benefits = () => {
    return <FeatureBlock featureList={featureList} />
}

export default Benefits