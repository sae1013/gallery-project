import React from 'react'
import {useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';

import {deletePostFB} from '../../shared/api/Post';
import {Grid,Image,Input,Text} from '../../elements/index';
import Button from '../../UI/Button';
import classes from './Post.module.scss';

function Post({item}) {
    
    const history = useHistory();
    const dispatch = useDispatch();

    const userStore = useSelector(state=>state.user)
    let loginUserEmail=''; 
    
    if(userStore.isLogin){
        loginUserEmail = userStore.user.email;
    }
    
    const editButtonHandler = (event) => {
        event.stopPropagation()
        history.push(`/write/${item.postId}`);
    }

    const postClickHandler = (event) => {
        event.stopPropagation()
        history.push(`/post/${item.postId}`)        
    }

    const deleteButtonHandler = (event) => {
        event.stopPropagation()
        dispatch(deletePostFB(item.postId));
    }

    return (
        
        <div className={classes.container}> 
            <div className={classes.card} onClick={postClickHandler}>
                <div className={classes.post_header}> 
                        <Image src={item.userInfo.userProfile}/>
                    <p className={classes.post_user}>{item.userInfo.userNickname}</p>
                    <p className={classes.post_date}>{item.insertDate}</p>
                    <div className={classes.post_activate}>
                        {loginUserEmail === item.userInfo.userEmail ? <Button fontSize="13px" padding="5px 10px" onClick={editButtonHandler}>수정하기</Button>:null}
                        {loginUserEmail === item.userInfo.userEmail ? <Button fontSize="13px" padding="5px 10px" onClick={deleteButtonHandler}>삭제하기</Button>:null}
                    </div>
                    
                </div>
                <hr></hr>        
                <div className={classes.post_contents}>
                    <Text>{item.contents}</Text>
                </div>
                <div>
                    <Image shape="rectangle" src={item.imageUrl}/>
                </div>
                <div className={classes.post_comments}>
                    <Text bold>댓글{item.commentCount}개</Text>
                </div>
            </div>
        </div>
        
    )
}

Post.defaultProps = {
    
}

export default React.memo(Post)
