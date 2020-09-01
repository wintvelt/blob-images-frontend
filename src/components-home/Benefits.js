import React from 'react';
import FeatureBlock from './FeatureBlock';

const featureList = [
    {
        icon: 'verified_user',
        title: 'Privé',
        descriptions: [
            "Je foto's zijn altijd uitsluitend zichtbaar voor jou, en voor degenen die je vertrouwt. " +
            ' Deel ze met je vrienden, je familie, of met je club. ' +
            'Veilig en beschermd opgeslagen op een omgeving binnen de EU.'
        ]
    },
    {
        icon: 'touch_app',
        title: 'Simpel',
        descriptions: [
            "Alleen foto's van jouw club. Geen reclame, geen spam. Simpel te bedienen. " +
            'Uploads en downloads zijn rechttoe rechtaan. ' +
            'Makkelijk te delen met jouw club. Gewoon de basis die je nodig hebt, verder niks.'
        ]
    },
    {
        icon: 'person_pin',
        title: 'Persoonlijk',
        descriptions: [
            "Voeg albums en titels toe, en kies je favoriete foto's. "  +
            'De clubgenoten die je uitnodigt krijgen een persoonlijke mail, en kunnen zo ook lid worden. ' +
            'Geen vreemden van buiten, en je hoeft geen lid te zijn van welk vaag social media platform dan ook.'
        ]
    },
]

const Benefits = () => {
    return <FeatureBlock featureList={featureList} />
}

export default Benefits