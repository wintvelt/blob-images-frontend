import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import Link from './Link';
import { UserContext } from './UserContext';

const useStyles = makeStyles((theme) => ({
    userButton: {
        marginLeft: theme.spacing(1),
        textTransform: 'none'
    },
    navLink: {
        marginLeft: theme.spacing(1),
        ...theme.typography.button,
        color: theme.palette.secondary.contrastText,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    avatar: {
        height: theme.spacing(2),
        width: theme.spacing(2),
        marginRight: theme.spacing(1),
    }
}));

export default function NavLogin(props) {
    const { path } = props;
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const { user, setUser } = userContext;
    const { userName, avatarUrl } = user;
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleLogout = () => {
        setUser({})
    }
    return (
        <>
            {userName &&
                <>
                    <Button className={classes.userButton}
                        aria-controls="simple-menu" aria-haspopup="true"
                        onClick={handleClick}
                        endIcon={<Icon>arrow_drop_down</Icon>}
                    >
                        <Avatar className={classes.avatar}
                            alt={userName} src={avatarUrl} />
                        {userName}
                    </Button>
                    <Menu
                        id='user-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={!!anchorEl}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>My pages</MenuItem>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>

                </>
            }
            {!userName &&
                <Link className={classes.navLink}
                    href={path}>
                    Login
                </Link>
            }
        </>
    );
}
