import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from '../components/profile/AccountProfile';
import AccountProfileDetail from '../components/profile/AccountProfileDetail';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {apiKey} from '../shared/firebase';

const Profile = () => {
  const user = useSelector(state => state.user.user);
  const history = useHistory();

  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSessionValue = sessionStorage.getItem(sessionKey) ? true : false;
  
  if(!isSessionValue && !user){ 
    history.replace('/login');
    return null
  }
  if(!user){ 
    return null
  }

  return(
    <>
    <Helmet>
      <title>Account</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile user={user}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetail user={user}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
}
export default Profile;