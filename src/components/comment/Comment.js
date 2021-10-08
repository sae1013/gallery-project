import React,{useState,useEffect} from 'react'

import Permit from '../../shared/Permit';
import CommentItem from '../comment/CommentItem';
import CommentWrite from '../comment/CommentWrite';
import classes from './Comment.module.scss'
import {getCommentFB} from '../../shared/api/Comment';
import {useDispatch,useSelector} from 'react-redux';
import Spinner from '../../shared/InfiniteSpinner';

function Comment(props) {
         
    const dispatch = useDispatch();
    const commentIsLoading = useSelector(state => state.comment.isLoading);
    const list = useSelector(state => state.comment.list)
    const commentList = list[props.postId];



    useEffect(()=>{
        if(!commentList)
        dispatch(getCommentFB(props.postId));
        
    },[]);
    
    if(commentIsLoading){
        return (
            <div>
                <Spinner></Spinner>
            </div>
        )
    }
    if(!commentList){
        return null;
    }
    return (
        <div className={classes.container}>
            <Permit>
                <CommentWrite postId = {props.postId}></CommentWrite>
            </Permit>
            {commentList.map((item)=>{
                return <CommentItem key ={item.commentId} comment={item}></CommentItem>
            })}
            
        </div>
        
        
    )
}

export default Comment
