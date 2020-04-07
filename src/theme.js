import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        secondary: { 
            main: '#46344e',
         },
        primary: { main: '#faed26' },
        // error: {
        //     main: red.A400,
        // },
        background: {
            default: '#46344e',
            paper: '#5a5560'
        },
    },
});

export default theme;