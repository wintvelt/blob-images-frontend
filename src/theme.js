import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        secondary: {
            main: '#46344e', // dark purple
        },
        primary: { 
            main: '#faed26', // yellow
        },
        text: {
            primary: '#fff',
            secondary: 'rgba(255,255,255,.8)',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#46344e',
            paper: '#5a5560', // dark grey
            light: '#9d8d8f', // light grey
            white: '#fff',
        },
    },
    overrides: {
        MuiIcon: {
            colorSecondary: {
                color: '#fff',
            }
        },
    }
});

export default theme;