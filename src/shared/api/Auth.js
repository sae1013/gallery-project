import { firebase, firestore,storage } from "../firebase";
import { userActions } from "../../redux/modules/user";

const signupFB = (signupFormUser, formikActions) => {
  const defaultProfileURL =
    "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg";
  const email = signupFormUser.email;
  const password = signupFormUser.password;
  const nickname = signupFormUser.nickname;
  let profileURL = signupFormUser.profileUrl
    ? signupFormUser.profileUrl
    : defaultProfileURL;

  return (dispatch, getState, { history }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;

        if (user != null) {
          //유저를 먼저 가입시키고, 닉네임과 사진을 저장한다.
          user
            .updateProfile({
              displayName: nickname,
              photoURL: profileURL,
            })
            .then(() => {
              dispatch(
                userActions.setUser({
                  email,
                  nickname,
                  profileURL: profileURL,
                  userId: user.uid,
                })
              );
              history.push("/");
            })
            .catch((err) => {
              window.alert("회원가입 실패");
              formikActions.setSubmitting(false);
            });
        }
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        window.alert("이미 사용중인 아이디 입니다.");
        formikActions.setSubmitting(false);
      });
  };
};

const loginFB = (email, password, formikActions) => {
  return (dispatch, getState, { history }) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .then((userCredential) => {
        // 로그인 성공
        let user = userCredential.user;

        dispatch(
          userActions.setUser({
            // 로그인 수행
            email: user.email,
            nickname: user.displayName,
            profileURL: user.photoURL,
            userId: user.uid,
          })
        );
        history.push("/");
      })

      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("인증이 실패하였습니다.");
        formikActions.setFieldValue("password", "");
        formikActions.setSubmitting(false);
      });
  };
};

const loginCheckFB = () => {
  return (dispatch, getState, { history }) => {
    dispatch(userActions.setIsLoading(true));
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          userActions.setUser({
            email: user.email,
            nickname: user.displayName,
            profileURL: user.photoURL,
            userId: user.uid,
          })
        );
        dispatch(userActions.setIsLoading(false));
      } else {
        dispatch(userActions.logout());
      }
    });
  };
};

const logoutFB = () => {
  return (dispatch, getState, { history }) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(userActions.logout());
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const editProfileFB = (nickname, profileImage) => {
  return (dispatch, getState, { history }) => {
    const currentUser = firebase.auth().currentUser;
    const storedUser = getState().user.user;

    if (profileImage) { // 이미지처리먼저해야함.
      const uploadImage = storage
        .ref(`images/${getState().user.user.userId}_${new Date().getTime()}`)
        .putString(profileImage, "data_url");

      uploadImage
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL();
        })
        .then((url) => {
          return currentUser.updateProfile({
            displayName:nickname,
            photoURL:url,
          })  
        })
        .then(()=>{
          dispatch(userActions.setUser({
            ...storedUser,nickname:nickname,profileURL:currentUser.photoURL,
          }))
          window.alert('변경되었습니다');
          history.push('/');
        })
        .catch((err)=>{
          console.log(err);
        })

    } 
    else {
      currentUser
        .updateProfile({
          displayName: nickname,
        })
        .then(() => {
          dispatch(userActions.setUser({
            ...storedUser,nickname:currentUser.displayName
          }))
          window.alert("변경되었습니다.");

          history.push("/");
        })
        .catch((err) => {
          window.alert(err);
        });
    }
  };
};

export { signupFB, loginFB, loginCheckFB, logoutFB, editProfileFB };
