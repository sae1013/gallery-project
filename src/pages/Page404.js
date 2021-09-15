import React from "react";

import classes from "./Page404.module.scss";
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';

function Page404() {
  const history = useHistory();

  return (
    <div className={classes.container}>
      <p className={classes.header}>
        404<br></br>
        <span>Not Found</span>
      </p>
      <h className={classes.description}>
        삭제되었거나, 존재하지 않습니다.
      </h>
      <div className={classes.action}>
        <Link className={classes.btn} to='/'>홈 이동</Link>
        <Link className={classes.btn} onClick={()=>history.goBack()}>돌아가기</Link>
      </div>
    </div>
  );
}

export default Page404;
