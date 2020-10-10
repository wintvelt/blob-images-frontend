import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    delete: {
        color: 'white',
        borderColor: theme.palette.error.main,
        backgroundColor: theme.palette.error.main,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2),
    }
}));

const flexCenter = { display: 'flex', alignItems: 'center' };
const flexGrow = { flexGrow: 1 };

const DeleteDialog = ({ open, onClose, onDelete, title, lines, abortText, submitText }) => {
    const classes = useStyles();
    return <Dialog open={open} onClose={onClose} aria-labelledby="dialog-confirm-deletion"
        fullWidth maxWidth='sm'>
        <DialogTitle disableTypography id="image-upload-dialog" style={flexCenter}>
            <Typography variant='h6' style={flexGrow}>{title}</Typography>
            <IconButton onClick={onClose}><Icon>close</Icon></IconButton>
        </DialogTitle>
        <DialogContent>
            {lines.map((line, i) =>
                <Typography key={i} variant='body1' gutterBottom>
                    {line}
                </Typography>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>
                {abortText}
            </Button>
            <Button onClick={onDelete} variant='contained' color='secondary' disableElevation className={classes.delete}>
                {submitText}
            </Button>
        </DialogActions>
    </Dialog>
};

export default DeleteDialog;