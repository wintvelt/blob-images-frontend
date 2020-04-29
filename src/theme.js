import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: { main: '#5a5560' },
        secondary: { 
            main: '#faed26',
         },
        text: {
            white: '#fff',
            secondary: 'rgba(0,0,0,.8)',
            primary: '#551b8b', // lighter purple
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#5a5560',
            light: '#d8d2d2',
            dark: '#5a5560', // dark grey
            grey: '#9d8d8f',
            paper: '#f9f1f2', // very light grey
            white: '#fff',
            brown: '#9b786f'
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