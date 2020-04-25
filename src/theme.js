import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: { main: '#46344e' },
        secondary: { 
            main: '#faed26',
         },
        text: {
            primary: '#551b8b', // lighter purple
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#46344e',
            light: '#5a5560', // dark grey
            paper: '#f9f1f2', // very light grey
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