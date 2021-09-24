import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';

import {addCommentFB} from '../../shared/api/Comment';
import classes from './CommentWrite.module.scss';
import Button from '../../UI/Button';

function CommentWrite(props) {
    const dispatch = useDispatch();
    const [text,setText] = useState('');
    
    const textChangeHandler = (e) => {
        setText(e.target.value);
    }

    const submitHandler = () => {
        setText('');        
        dispatch(addCommentFB(props.postId,text));
    }
    const enterSubmitHandler = (e) => {
        if(e.key ==='Enter'){
            setText('');        
            dispatch(addCommentFB(props.postId,text));
        }
    }

    return (
        <div className={classes.submit_section}>
                <input placeholder='댓글 내용을 입력해주세요:)' value={text} onChange ={textChangeHandler} onKeyPress={enterSubmitHandler}></input>
                <Button margin='0 10px' onClick={submitHandler}>작성</Button>
        </div>
    )
}

export default CommentWrite
