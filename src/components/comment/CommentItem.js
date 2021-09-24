import React from 'react'

import classes from './CommentItem.module.scss';
import Image from '../../elements/Image';

function CommentItem({comment}) {

    const {contents,insertDate,postId,userId,userNickname,userProfile} = comment

    return (
        <div className={classes.container}>
            <Image src={userProfile}></Image>
            <p className={classes.author}>{userNickname}</p>
            <p className={classes.comment_text}>{contents}</p>
        </div>
    )
}

export default React.memo(CommentItem)
