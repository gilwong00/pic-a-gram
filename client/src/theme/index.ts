import { createMuiTheme } from '@material-ui/core'
import { purple, blue } from '@material-ui/core/colors';


export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: purple[700],
    },
    secondary: {
      main: '#f50057',
    },
  },
});
