import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import Comment from "../components/comment/Comment";
import Post from "../components/post/Post";
import Spinner from "../shared/InfiniteSpinner";
import classes from "./PostDetail.module.scss";
import Image from "../elements/Image";
import { getPostDetailFB } from "../shared/api/Post";
import { deletePostFB } from "../shared/api/Post";

import Button from '../UI/Button';

function PostDetail(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const postList = useSelector((state) => state.post.list);
  const postIsLoading = useSelector((state) => state.post.isLoading); 
  const userStore = useSelector((state) => state.user);
  const loginUserEmail = userStore.user?.email;
  let post;

  if (postList.length > 0) {
    let existIdx = postList.findIndex((p) => p.postId === params.id);
    post = postList[existIdx];
  }

  const editButtonHandler = (e) => {
    e.stopPropagation();
    history.push(`/write/${post.postId}`);
  };

  const deleteButtonHandler = (e) => {
    e.stopPropagation();
    dispatch(deletePostFB(post.postId)); 
  };

  useEffect(() => {
    
    if (!post) {
      // 리덕스 post데이터가 없을때만 요청.
      dispatch(getPostDetailFB(params.id));
    }
  }, []);

  if (postIsLoading) {
    return (
      <div>
        <Spinner></Spinner>
      </div>
    );
  }
  if (!postIsLoading && !post) {
    return null;
  }
  if (!postIsLoading) {
    return (
      <div className={classes.detail_page_container}>
        <div className={classes.container}>
          <div className={classes.post_header}>
            <Image src={post.userInfo.userProfile} />
            <p className={classes.post_user}>{post.userInfo.userNickname}</p>
            <p className={classes.post_date}>{post.insertDate}</p>
            <div className={classes.post_activate}>
              {loginUserEmail === post.userInfo.userEmail ? (
                <Button fontSize="13px" padding="5px 10px" onClick={editButtonHandler}>수정하기</Button>
              ) : null}
              {loginUserEmail === post.userInfo.userEmail ? (
                <Button fontSize="13px" padding="5px 10px" onClick={deleteButtonHandler}>삭제하기</Button>
              ) : null}
            </div>
          </div>
          <hr></hr>
          <div className={classes.post_contents}>
            <p>{post.contents}</p>
          </div>
          <div>
            <Image shape="rectangle" src={post.imageUrl} />
          </div>
          <div className={classes.post_comments}>
            <p>댓글{post.commentCount}개</p>
          </div>
          <Comment postId={params.id}></Comment>
        </div>
      </div>
    );
  }
}

export default PostDetail;
