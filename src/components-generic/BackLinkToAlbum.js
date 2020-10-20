import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import Link from '../components-generic/Link';
import { useActiveAlbumValue } from '../data/activeTree-Album';

const linkStyle = {
    position: 'absolute',
    top: '64px',
    left: '24px',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    width: 'fit-content',
    marginBottom: '24px',
    zIndex: 1,
    backgroundColor: '#ffffff40',
    paddingRight: '8px',
};
const linkStyle2 = { color: 'inherit' };

const BackLinkToAlbum = ({ className }) => {
    const albumData = useActiveAlbumValue();
    const album = albumData.contents;
    if (!album?.id) return null;

    const groupPath = '/personal/groups/[id]';
    const groupAs = groupPath.replace('[id]', album.groupId);
    const groupText = album.group.name || 'groep';
    const albumPath = '/personal/groups/[id]/albums/[albumid]';
    const albumAs = albumPath.replace('[id]', album.groupId).replace('[albumid]', album.albumId);
    const albumText = album.name || 'album';
    return <Typography variant='body1' component='span' style={linkStyle}>
        <Icon fontSize='small'>arrow_back</Icon>
        <Link href={groupPath} as={groupAs}
            className={className}
            style={linkStyle2}
        >
            {` ${groupText}`}
        </Link>
        {'\u00A0'}|{'\u00A0'}
        <Link href={albumPath} as={albumAs}
            className={className}
            style={linkStyle2}
        >
            {` ${albumText}`}
        </Link>
    </Typography>
}

export default BackLinkToAlbum;