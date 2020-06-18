import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { useSetLoadingPath } from '../data/loadingData';

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

const CardAdd = ({ text, path, asPath }) => {
    const classes = useStyles();
    const setLoadingPath = useSetLoadingPath();
    const onClick = () => {
        setLoadingPath(
            path,
            asPath,
        );
    }
    return <Card className={classes.newCard}>
        <CardActionArea className={classes.link} onClick={onClick}>
            <Icon fontSize='large'>add</Icon>
            <Typography variant='h5'>{text}</Typography>
        </CardActionArea>
    </Card>
}

export default CardAdd;