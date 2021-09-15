import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import FileUpload from "../post/FileUpload";
import { editProfileFB } from "../../shared/api/Auth";
import { useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux';

const AccountProfileDetail = (props) => {
  const history = useHistory();
  const [values, setValues] = useState(props.user);
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
  const [isSubmitting,setIsSubmitting] = useState(false);

  const setImageHandler = (imageUrl) => {
    setProfileImage(imageUrl);
  };

  const submitHandler = () => {
    setIsSubmitting(true);
    setTimeout(()=>{
      setIsSubmitting(false);
    },1000)
    if (
      values.nickname === props.user.nickname &&
      !profileImage 
    ) {
      window.alert("변경사항이 없습니다.");
      return
    }
    if (values.nickname) {
      dispatch(editProfileFB(values.nickname,profileImage));
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FileUpload onSetPreviewImg={setImageHandler}></FileUpload>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the display name"
                // label="display name"
                name="nickname"
                onChange={handleChange}
                required
                value={values.nickname}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={submitHandler} disabled={isSubmitting}>
            Save Details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetail;
