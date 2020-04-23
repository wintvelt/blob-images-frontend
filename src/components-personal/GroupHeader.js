import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';

import CardGroup from '../CardGroup';

const useStyles = makeStyles(theme => ({
    container: {
        paddingBottom: theme.spacing(4),
    },
}));



const GroupHeader = () => {
    const classes = useStyles();
    return <div className={classes.container}>
        <CardGroup title={'Foto\'s van Blob'}
            description='Laag naar de top sinds 1985'
            stats={[
                'since 8 Jan 2019',
                '6 albums',
                '492 photos',
                '19 members'
            ]}
            image={{ title: 'Tanzania', src: '/cover_2.jpg' }}
            members={[
                { name: 'Ebeling' },
                { name: 'Daat' },
                { name: 'Botje' },
                { name: 'Vaatje' },
                { name: 'Klei' },
                { name: 'Gurp' },
            ]}
            userIsAdmin={true}
            isGroup
        />
    </div>
}

export default GroupHeader;