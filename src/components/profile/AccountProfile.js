import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';


const AccountProfile = (props) => (
  
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={props.user.profileURL}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {props.user.nickname}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {props.user.email}
        </Typography>
        
      </Box>
    </CardContent>
    <Divider />
    
  </Card>
);

export default AccountProfile;