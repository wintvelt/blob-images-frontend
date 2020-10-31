import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import FeatureForm from './FeatureForm';

const rightStyle = { position: 'absolute', right: '8px', top: '8px' };

const FeatureDialog = ({ open, onClose }) => {
    return <Dialog open={open} onClose={onClose} aria-labelledby="dialog-submit-new-feature"
        fullWidth maxWidth='sm'>
            <FeatureForm
                title={'Jouw wens'}
                subtitle={'voor een nieuwe toeter of bel op clubalmanac'}
            />
            <IconButton onClick={onClose} style={rightStyle}><Icon>close</Icon></IconButton>
    </Dialog>
};

export default FeatureDialog;