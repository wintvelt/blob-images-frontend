import React from 'react'
import FeatureBlock from './FeatureBlock';

const featureList = [
    {
        icon: 'person_pin',
        title: 'Over ons',
        descriptions: [
            `Deze website is gemaakt door, en wordt beheerd door Wouter.`,
            `Speciaal om foto's van de jaarclub Blob te kunnen delen met elkaar.`,
            `Omdat andere "gratis" foto-websites maar een paar jaar meegaan.`,
            `Dat is naadje. Deze website lost dat op`
        ]
    },
    {
        icon: 'verified_user',
        title: 'Jouw privacy',
        descriptions: [
            `Een account maak je aan met je email-adres. Je kunt foto's opslaan en delen met anderen leden,
            in groepen en albums.`,
            `Voor de juristen onder u en andere paranoide lezers: meer info hieronder.`
        ]
    },
    {
        icon: 'contact_support',
        title: 'Ondersteuning',
        descriptions: [
            `Als je hulp wilt, stuur dan een berichtje aan Wouter. Die kan je vast helpen.`,
            `Als je geen contactgegevens van Wouter hebt, stuur dan een bericht aan een ander lid. 
            Hij of zij kent Wouter vast wel`
        ]
    },
]

const AboutUs = () => {
    return <FeatureBlock featureList={featureList} />
}

export default AboutUs;