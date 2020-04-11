import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        secondary: {
            main: '#46344e',
        },
        primary: { 
            main: '#faed26',
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
            paper: '#5a5560',
            light: '#9d8d8f',
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