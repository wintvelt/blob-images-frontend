import React from 'react';
import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    newCard: {
        height: '200px',
        background: 'none',
        borderWidth: '2px',
        borderStyle: 'dashed',
        borderColor: theme.palette.text.secondary,
        color: theme.palette.text.secondary,
        boxShadow: 'none',
        "&:hover": {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
        }
    },
    link: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
}));

const AlbumCardAdd = () => {
    const classes = useStyles();
    const router = useRouter();
    const groupId = router.query.groupId
    const onClick = () => {
        router.push('/personal/groups/[id]/albums/new/edit',`/personal/groups/${groupId}/albums/new/edit`);
    }
    return <Card className={classes.newCard}>
        <CardActionArea className={classes.link} onClick={onClick}>
            <Icon fontSize='large'>add</Icon>
            <Typography variant='h5'>new album</Typography>
        </CardActionArea>
    </Card>
}

export default AlbumCardAdd;