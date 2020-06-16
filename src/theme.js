import { createMuiTheme } from '@material-ui/core/styles';
import { lime, cyan } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        // type: 'light',
        primary: { main: cyan[700] },
        secondary: {
            main: '#fdec00',
        },
        // text: {
        //     white: '#fff',
        //     secondary: 'rgba(0,0,0,.8)',
        //     primary: '#551b8b', // lighter purple
        // },
        // error: {
        //     main: red.A400,
        // },
        // background: {
        //     default: '#5a5560',
        //     light: '#d8d2d2',
        //     dark: '#5a5560', // dark grey
        //     grey: '#9d8d8f',
        //     paper: '#f9f1f2', // very light grey
        //     white: '#fff',
        //     brown: '#9b786f'
        // },
    },
    overrides: {
        MuiGridListTileBar: {
            subtitle: {
                lineHeight: '1.2rem'
            }
        },
        MuiDialog: {
            paper: {
                // minWidth: '50%',
            }
        },
        MuiFormControlLabel: {
            label: { lineHeight: '1.2rem' }
        }
    }
});

export default theme;