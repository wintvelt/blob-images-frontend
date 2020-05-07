const sampleData = {
    'myUrl/groups': [
        {
            id: 'group1',
            title: 'Foto\'s van Blob',
            subtitle: 'Laag naar de top sinds 1985',
            image: '/cover_2.jpg',
            userIsAdmin: true,
        },
        {
            id: 'group2',
            title: 'In \'t Velt familiealbums',
            subtitle: 'Door de jaren heen in Soest en daarbuiten',
            image: '/cover_2.jpg',
            userIsAdmin: true,
        },
        {
            id: 'group3',
            title: 'LamInt photos',
            subtitle: 'Sharing family life',
            image: '/cover_2.jpg',
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
        image: '/cover_2.jpg',
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

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const getDataFrom = async (source) => {
    await timeout(3000);
    return sampleData[source] || source;
}