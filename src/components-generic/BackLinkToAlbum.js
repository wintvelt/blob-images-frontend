import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import Link from '../components-generic/Link';
import { useRecoilValueLoadable } from 'recoil';
import { activeGroupState, hasGroupData } from '../data/activeTree-Group';
import { activeAlbumState, hasAlbumData } from '../data/activeTree-Album';

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
};
const linkStyle2 = { color: 'inherit' };

const BackLinkToAlbum = ({ className }) => {
    const albumData = useRecoilValueLoadable(activeAlbumState);
    const hasValue = hasAlbumData(albumData);
    if (!hasValue) return null;

    const album = albumData.contents;
    const albumPath = '/personal/groups/[id]/alumbs/[albumid]';
    const albumAs = albumPath.replace('[id]', album.group?.id).replace('[albumid]', album.SK);
    const text = album.name || 'album';
    return <Typography variant='body1' component='span' style={linkStyle}>
        <Icon fontSize='small'>arrow_back</Icon>
        <Link href={albumPath} as={albumAs}
            className={className}
            style={linkStyle2}
        >
            {` ${text}`}
        </Link>
    </Typography>
}

export default BackLinkToAlbum;