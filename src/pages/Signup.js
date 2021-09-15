// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

// import classes from "./Signup.module.scss";
// import { signupFB } from "../shared/api/Auth";

// const emailExpression =
//   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// function Signup() {
//   // const history = useHistory();
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [secondPassword, setSecondPassword] = useState("");
//   const [nickName, setNickname] = useState("");

//   const signupHandler = () => {
//     if (email.trim() === "" || !emailExpression.test(email)) {
//       window.alert("올바른 이메일이 아닙니다!");
//       return;
//     }
//     if (nickName.trim() === "") {
//       window.alert("닉네임을 입력해주세요");
//       return;
//     }
//     if (password.length < 6) {
//       window.alert("비밀번호는 6자리 이상을 입력해주세요");
//       return;
//     }
//     if (secondPassword !== password) {
//       window.alert("비밀번호를 다시 확인해주세요");
//       return;
//     }
//     dispatch(signupFB(email, password, nickName));
//   };

//   const emailInputChange = (e) => {
//     setEmail(e.target.value);
//   };
//   const passwordInputChange = (e) => {
//     setPassword(e.target.value);
//   };
//   const secondPasswordInputChange = (e) => {
//     setSecondPassword(e.target.value);
//   };
//   const nickNameInputChange = (e) => {
//     setNickname(e.target.value);
//   };

//   return (
//     <div className={classes.wrapper}>
//       <div className={classes.container}>
//         <p>회원가입</p>
//         <div className={classes.form}>
//           <div className={classes.form_element}>
//             <label>아이디</label>
//             <input value={email} onChange={emailInputChange}></input>
//           </div>

//           <div className={classes.form_element}>
//             <label>닉네임</label>
//             <input value={nickName} onChange={nickNameInputChange}></input>
//           </div>

//           <div className={classes.form_element}>
//             <label>비밀번호</label>
//             <input
//               type="password"
//               value={password}
//               onChange={passwordInputChange}
//             ></input>
//           </div>

//           <div className={classes.form_element}>
//             <label>비밀번호 확인</label>
//             <input
//               type="password"
//               value={secondPassword}
//               onChange={secondPasswordInputChange}
//             ></input>
//           </div>

//           <div className={classes.submit_form}>
//             <button className={classes.submit_button} onClick={signupHandler}>
//               회원가입하기
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { signupFB } from "../shared/api/Auth";

const Register = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Register | Image Gallery</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              nickName: "",
              email: "",
              password: "",
              policy: false,
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              nickName: Yup.string().max(255).required("Nick name is required"),
              password: Yup.string().max(255).required("password is required"),
              policy: Yup.boolean().oneOf([true], "This field must be checked"),
            })}
            onSubmit={(values, actions) => {
              dispatch(
                signupFB(
                  {
                    email: values.email,
                    password: values.password,
                    nickname: values.nickName,
                  },
                  actions
                )
              );
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.nickName && errors.nickName)}
                  fullWidth
                  helperText={touched.nickName && errors.nickName}
                  label="Nick name"
                  margin="normal"
                  name="nickName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nickName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    ml: -1,
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the{" "}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                    underline="hover"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
