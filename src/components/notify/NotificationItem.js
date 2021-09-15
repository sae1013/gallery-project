import React from 'react'
import {useHistory} from 'react-router-dom';
import {realtimeDB,firebase} from '../../shared/firebase';
import {useSelector} from 'react-redux';

import classes from './NotificationItem.module.scss';
import Image from '../../elements/Image';

function NotificationItem(props) {
    const noti = props.notiItem;
    const history = useHistory();
    const loginUser = useSelector(state => state.user.user?.userId);

    const notiItemClickHandler = () => {
        const notiRef = realtimeDB.ref(`/noti/${loginUser}/list/${noti.notiId}`);
        notiRef.update({read:true}).then(()=>{
            history.push(`/post/${noti.postId}`);    
        });
        
        
        
    }

    return (
        <div className={`${classes.item_container} ${!noti.read ? classes.active : null} `} onClick={notiItemClickHandler}>
            <Image shape="circle" width='100px' height='100px'
                src ={noti.userProfile}></Image>
            <div className={classes.contents}>
                <p>{noti.userNickname}님이 회원님의 게시물에 댓글을 남겼습니다</p>
                <p>{noti.contents}</p>    
            </div>        
            
        </div>
    )
}

export default NotificationItem
