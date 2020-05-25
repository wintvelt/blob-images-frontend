const sampleData = {
    'myUrl/photos': [{
        id: 'P6dea4cc0-9a0f-11ea-b6aa-a5ab39ed4825',
        owner: 'Local me',
        image: 'protected/eu-central-1:0f262fe9-430e-4504-bad4-95306c57120f/me2.jpg',
        date: '2020-05-01'
    },
    {
        id: 'Pbb3996a0-9a0c-11ea-8744-393569611d44',
        owner: 'Local me',
        image: 'protected/eu-central-1:0f262fe9-430e-4504-bad4-95306c57120f/me.jpg',
        date: '2020-05-01'
    }],
    'myUrl/groups/new/photos': [{
        id: 'P6dea4cc0-9a0f-11ea-b6aa-a5ab39ed4825',
        owner: 'Local me',
        image: 'protected/eu-central-1:0f262fe9-430e-4504-bad4-95306c57120f/me2.jpg',
        date: '2020-05-01'
    }],
    'myUrl/groups': [
        {
            id: 'group1',
            title: 'In \'t Velt familiealbums',
            subtitle: 'Door de jaren heen in Soest en daarbuiten',
            image: { image: '/cover_2.jpg' },
            userIsAdmin: true,
        },
        {
            id: 'group2',
            title: 'Foto\'s van Blob',
            subtitle: 'Laag naar de top sinds 1985',
            image: { image: 'eu-central-1:13691c14-c389-4974-b5ab-f401c71bde0a/cover.jpg' },
            userIsAdmin: true,
        },
        {
            id: 'group3',
            title: 'LamInt photos',
            subtitle: 'Sharing family life',
            image: { image: '/cover_2.jpg' },
            userIsAdmin: false,
        },
        {
            id: 'group4',
            title: 'Foto\'s van Blob',
            subtitle: 'Laag naar de top sinds 1985',
            image: { image: 'eu-central-1:13691c14-c389-4974-b5ab-f401c71bde0a/cover.jpg' },
            userIsAdmin: true,
        },
        {
            id: 'group5',
            title: 'LamInt photos',
            subtitle: 'Sharing family life',
            image: { image: '/cover_2.jpg' },
            userIsAdmin: false,
        },
    ],
    'myUrl/groups/group2': {
        title: 'Foto\'s van Blob',
        subtitle: 'Laag naar de top sinds 1985',
        stats: [
            'since 8 Jan 2019',
            '6 albums',
            '492 photos',
            '19 members'
        ],
        image: {
            image: 'eu-central-1:13691c14-c389-4974-b5ab-f401c71bde0a/cover.jpg',
            owner: 'Michiel',
            album: 'Blob in Afrika'
        },
        userIsAdmin: true,
    },
    'myUrl/groups/group2/members': [
        { name: 'LJ van Berkestijn', avatar: '' },
        { name: 'Paul Botje', avatar: '' },
        { name: 'Dave del Canho', avatar: '' },
        { name: 'Wouter In \'t Velt', avatar: '/img/me.jpg' },
        { name: 'Fred Kleiterp', avatar: '' },
        { name: 'Michiel Ebeling', avatar: '' },
    ]
}

export function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const getSampleDataFrom = async (source) => {
    await timeout(3000);
    return sampleData[source] || source;
}

export const postDataTo = async (source, body) => {
    await timeout(3000);
    return 'ok';
}