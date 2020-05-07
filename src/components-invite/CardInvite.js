import React from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { CardActionArea } from '@material-ui/core';

import Link from '../components-generic/UnstyledLink';

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        backgroundColor: 'white',
        height: '288px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'cursive'
    },
    cardNew: {
        position: 'relative',
        background: 'none',
        height: '288px',
    },
    actionArea: {
        height: 'inherit'
    },
    content: {
        position: 'relative',
    },
    newContent: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed rgba(255,255,255,.8)',
    },
    media: {
        width: '100%',
        height: '288px',
        position: 'absolute',
        top: 0,
        opacity: .2,
    },
    imageEdit: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        zIndex: 99,
        backgroundColor: 'rgba(0,0,0,.2)',
        marginLeft: theme.spacing(1),
    },
    text: {
        color: theme.palette.text.secondary,
        position: 'relative',
        backgroundColor: 'rgba(255,255,255,.2)'
    },
}));

const InviteCardContent = (props) => {
    const { invitorName, invitedGroup, expirationDate, imageSrc, isNew, isAccepted } = props;
    const classes = useStyles();

    return <>
        {!isNew && <CardMedia image={imageSrc} alt='invitation' className={classes.media} />}
        {!isNew && <img src='/img/invite.png'
            alt='You are invited!'
            style={{ width: '264px', position: 'relative' }}
        />}
        <Typography variant="subtitle1" component="p">
            <span className={classes.text}>to join</span>
        </Typography>
        <Typography variant='h3' style={{ fontFamily: "'Pinyon Script', cursive" }}>
            <span className={classes.text}>{invitedGroup}</span>
        </Typography>
        <Typography variant="subtitle1" component="p">
            <span className={classes.text}>{`${invitorName} cordially invites you`}</span>
        </Typography>
        <img src='/img/invite_divider.png' alt='divider' style={{ width: '64px', position: 'relative' }} />
        <Typography variant="subtitle1" color="primary">
            <span className={classes.text}>
                R.S.V.P. before
                {' '}{moment(expirationDate, 'YYYY-MM-DD').format('DD MMM YYYY')}
            </span>
        </Typography>
        {(isAccepted) && <img src='/img/accepted.png' alt='accepted'
            style={{ position: 'absolute', top: 0, right: 0 }} />}
    </>
}

const CardInvite = (props) => {
    const { id, isHeader, userIsAdmin, isNew } = props;
    const classes = useStyles();
    const href = `/invites/received/${id || 'new'}`;
    return <Card className={isNew ? classes.cardNew : classes.card}>
        {(isHeader) ?
            <InviteCardContent {...props} />
            : <CardActionArea className={classes.actionArea}>
                <Link href={(isNew) ? href + '/edit' : href}>
                    <InviteCardContent {...props} />
                </Link>
            </CardActionArea>
        }
        {userIsAdmin && <Link href={href + '/edit'}>
            <IconButton size='small' color='inherit' className={classes.imageEdit}>
                <Icon fontSize='small'>{(isHeader) ? 'edit' : 'more_vert'}</Icon>
            </IconButton>
        </Link>}
    </Card>
}

export default CardInvite;