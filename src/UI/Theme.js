import { createTheme } from '@material-ui/core/styles';

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60"
const red ="#D53515"
const white= "#fff"

export default createTheme({
  palette: {
    primary: {
      main: `${arcBlue}`      
    },
    secondary: {
      main:`${red}`
    },
  },
  typography:{
    estimate: {
      fontSize:"1rem",
      textTransform:"none",
    }
  },
  spacing:10
});

