import Spinner from '../elements/Spinner';
import React from 'react';
import classes from './LoadingPage.module.scss';

const LoadingPage = () => {
  return(
    <div className={classes.section}>
      <p className={classes.header}>페이지 로딩중입니다...</p>
      <Spinner shape="syncLoader"></Spinner>
    </div>
    
  )
}
export default LoadingPage;