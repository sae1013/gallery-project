import { firestore, firebase, storage } from "../firebase";

import { postActions } from "../../redux/modules/post";
import moment from "moment";

const getPostFB = (start = null, size = 4) => {
  return (dispatch, getState, { history }) => {
    if (getState().post.paging.start && !getState().post.paging.next) {
      // 더 로드할 데이터 x

      return;
    }

    dispatch(postActions.setLoading(true));
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insertDate", "desc");
    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        const postList = [];
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length == size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((doc) => {
          const data = doc.data();
          const dataKey = Object.keys(data);
          const FormmedData = dataKey.reduce(
            (acc, cur) => {
              if (cur.indexOf("user") == 0) { 
                acc.userInfo[cur] = data[cur];
                return acc;
              }

              acc[cur] = data[cur];
              return acc;
            },
            { postId: doc.id, userInfo: {} }
          );

          postList.push(FormmedData);
        });

        if (postList.length == size + 1) {
          postList.pop();
        }
        dispatch(postActions.setPost({ postList, paging }));
        dispatch(postActions.setLoading(false));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

const addPostFB = ({ contents, imgStringUrl }) => {
  return (dispatch, getState, { history }) => {
    dispatch(postActions.setLoading(true));
    const postDB = firestore.collection("post");

    const userInfo = {
      userEmail:getState().user.user.email,
      userId:getState().user.user.userId,
      userProfile:getState().user.user.profileURL,
      userNickname:getState().user.user.nickname
  }
    const postData = {
      commentCount: 0,
      contents: contents,
      insertDate: moment().format("YYYY-MM-DD hh:mm:ss"),
      imageUrl: null,
    };

    if (imgStringUrl) { 
      const uploadImage = storage
        .ref(`images/${getState().user.user.userId}_${new Date().getTime()}`)
        .putString(imgStringUrl, "data_url");

      uploadImage
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL();
        })
        .then((url) => {
          postData["imageUrl"] = url;

          return postDB.add({ ...userInfo, ...postData });
        })
        .then((doc) => {
          dispatch(
            postActions.addPost({ postId: doc.id, userInfo, ...postData })
          ); //리덕스의 postList에 추가.
          dispatch(postActions.setLoading(false));
          history.replace("/");
        })
        .catch((err) => {
          console.log(err);
          window.alert(err.message);
        });
    } else { //이미지가 없는경우
      postDB
        .add({ ...userInfo, ...postData })
        .then((doc) => {
          dispatch(
            postActions.addPost({ postId: doc.id, userInfo, ...postData })
          ); 
          dispatch(postActions.setLoading(false));
          history.replace("/");
        })
        .catch((err) => {
          console.log(err);
          window.alert(err.message);
        });
    }
  };
};

const loadPostFB = (postId, setPreviewImg, setText) => {
  return (dispatch, getState, { history }) => {
    dispatch(postActions.setLoading(true));
    firestore
      .collection("post")
      .doc(postId)
      .get()
      .then((postRef) => {
        const postData = postRef.data();
        setPreviewImg(postData.imageUrl);
        setText(postData.contents);
        dispatch(postActions.setLoading(false));
      });
  };
};

const editPostFB = (postId, contents, imgStringUrl) => {
  return (dispatch, getState, { history }) => {
    dispatch(postActions.setLoading(true));
    const userInfo = {
      userEmail: getState().user.user.email,
      userId: getState().user.user.userId,
      userProfile: getState().user.user.profileURL,
      userNickname: getState().user.user.nickname,
    };
    const postData = {
      contents: contents,
      imageUrl: imgStringUrl,
    };
    const postRef = firestore.collection("post").doc(postId);

    postRef
      .update({
        ...userInfo,
        ...postData,
      })
      .then(() => {
        dispatch(postActions.editPost({ postId, editObject: postData })); // 수정 포스트 id 하고 editObject 전달하기.
        history.replace("/");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
};

const getPostDetailFB = (postId) => {
  return (dispatch, getState, { history }) => {
    dispatch(postActions.setLoading(true));
    const postDB = firestore.collection("post");
    postDB
      .doc(postId)
      .get()
      .then((doc) => {
        const data = doc.data();
        if (!data) {
          dispatch(postActions.setLoading(false));
          history.replace("/postNotFound");
          return;
        }

        const dataKey = Object.keys(data);
        const FormmedData = dataKey.reduce(
          (acc, cur) => {
            if (cur.indexOf("user") == 0) {
              acc.userInfo[cur] = data[cur]; 
              return acc;
            }

            acc[cur] = data[cur];
            return acc;
          },
          { postId: doc.id, userInfo: {} }
        );

        dispatch(postActions.setLoading(false));
        dispatch(postActions.addPost(FormmedData));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

const deletePostFB = (postId) => {
  return (dispatch, getState, { history }) => {
    firestore
      .collection("post")
      .doc(postId)
      .delete()
      .then(() => {
        dispatch(postActions.deletePost(postId));
        console.log("성공적으로 삭제됨");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export {
  getPostFB,
  addPostFB,
  editPostFB,
  loadPostFB,
  getPostDetailFB,
  deletePostFB,
};
