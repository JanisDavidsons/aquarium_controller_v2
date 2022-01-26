import React  from 'react';

import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, StylesProvider } from '@mui/styles';

import { blueGrey, indigo, orange, red, green } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: indigo,
      secondary: blueGrey,
      info: {
        main: blueGrey[900]
      },
      warning: {
        main: orange[500]
      },
      error: {
        main: red[500]
      },
      success: {
        main: green[500]
      }
    },
  });

function CustomMuiTheme (props) {

    return (
        <StylesProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {props.children}
            </ThemeProvider>
        </StylesProvider>
    );
}

export default CustomMuiTheme;