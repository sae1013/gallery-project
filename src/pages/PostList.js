import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Post from "../components/post/Post";
import { getPostFB } from "../shared/api/Post";
import Spinner from "../elements/Spinner";
import InfinityScroll from "../shared/InfinityScroll";
import classes from "./PostList.module.scss";
import { useMediaQuery } from 'react-responsive'
import { uiActions } from "../redux/modules/ui";
import SkeletonListView from "../UI/SkeletonListView";

function PostList(props) {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list);
  const isLoading = useSelector((state) => state.post.isLoading);
  const isFirstLoaded = useSelector((state) => state.post.isFirstLoaded);
  const paging = useSelector((state) => state.post.paging);
  let isTabletScreen=useMediaQuery({maxWidth:1023});
  let fetchSize = isTabletScreen ? 4 : 10
  
  useEffect(() => {
    
    dispatch(uiActions.floatButtonUpdate());
    if (postList.length < 2) { 
      dispatch(getPostFB(paging.next,fetchSize));
    }
  }, []);

  const infiniteScrollHandler = () => {
    dispatch(getPostFB(paging.next,fetchSize));
  };

  let content;

  if (!isLoading && !isFirstLoaded) {
    content = null
  } else if (isLoading) { 
    content = (
      <div className={classes.container}>
        {postList.map((postItem) => {
          return <Post key={postItem.postId} item={postItem}></Post>;
        })}
        <SkeletonListView size={fetchSize}/>
      </div>
      
    );
  } else if (!isLoading && !postList.length && isFirstLoaded) {
    content = <div>데이터가 텅텅.....</div>;
  } else if (postList.length > 0) {

    content = (
      <div className={classes.container}>
        {postList.map((postItem) => {
          return <Post key={postItem.postId} item={postItem}></Post>;
        })}
      </div>
    ); 
  }

  return (
    <React.Fragment>
      <InfinityScroll
        callNext={infiniteScrollHandler}
        isLoading={isLoading}
        isNext={paging.next}
      >
        {content}
      </InfinityScroll>
    </React.Fragment>
  );
}

export default PostList;
