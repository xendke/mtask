import { blueGrey500, blue500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    accent1Color: blue500
  }
});

export default muiTheme;
