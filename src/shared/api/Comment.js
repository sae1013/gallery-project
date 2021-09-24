import {firestore,firebase,realtimeDB} from '../firebase';
import {commentActions} from '../../redux/modules/comment';
import {postActions} from '../../redux/modules/post';
import moment from 'moment';

const getCommentFB = (postId = null) => {
    
    return (dispatch,getState,{history})=>{
        if(!postId){
            return
        }
        dispatch(commentActions.setLoading(true));
        const commentDB = firestore.collection('comment');
        commentDB.where('postId', '==' ,postId).orderBy('insertDate','desc').get()
        .then((docs)=>{
            let commentList = []
            docs.forEach((doc)=>{
                commentList.push({commentId:doc.id,...doc.data()});
            })

            dispatch(commentActions.setComment({postId,commentList}));
            dispatch(commentActions.setLoading(false));
        })
        .catch((err)=>{
            console.log(err.message);
        })

    }
}

const addCommentFB = (postId,contents) => {

    return (dispatch,getState,{history}) => {
        let newComment = {
            contents: contents,
            postId: postId,
            userId: getState().user.user.userId,
            userNickname:getState().user.user.nickname,
            userProfile:getState().user.user.profileURL,
            insertDate:moment().format("YYYY-MM-DD hh:mm:ss")
        }
        let post = getState().post.list.find(p => p.postId == postId); // 리덕스의 post 댓글 수를 업데이트 해줄것임.
        
        const commentDB = firestore.collection('comment'); // commentDB에 newComment를 저장.
        commentDB.add(newComment)
            .then((doc)=>{ // commentDB에 댓글 저장 성공시
                const postDB = firestore.collection('post');
                const increment = firebase.firestore.FieldValue.increment(1);
                const newCommentId= doc.id;

                postDB.doc(postId).update({commentCount:increment}) 
                    .then(()=>{
                        dispatch(commentActions.addComment({postId,comment:{commentId:newCommentId , ...newComment}})); // 성공하면, comment redux에 저장, 
                        
                        if(post){
                            dispatch(postActions.editPost({postId,editObject:{commentCount:parseInt(post.commentCount)+1} }));
                            if(post.userInfo.userId !== newComment.userId){ 
                                const notiListRef = realtimeDB.ref(`noti/${post.userInfo.userId}/list`).push();
                                const notiRef = realtimeDB.ref(`noti/${post.userInfo.userId}`);
                                notiListRef.set({ 
                                    notiId:notiListRef.key,
                                    commentId:newCommentId,
                                    postId: postId,
                                    userId:newComment.userId,
                                    userNickname:newComment.userNickname,
                                    userProfile: newComment.userProfile,
                                    contents:newComment.contents,
                                    read:false,
                                    insertDate: newComment.insertDate
                                    
                                    
                                },(err)=>{
                                    if(err){
                                        console.log(err);
                                        return
                                    }else{
                                        notiRef.update({read:false});
                                    };
                                });    
                            }
                            
                        }
                    })
                    .catch((err)=>{
                        console.log(err.message);
                    })
            })
            .catch((err)=>{ // commentDB에 댓글 저장 실패시 에러처리
                console.log(err.message)
            })

    }
}
export {getCommentFB, addCommentFB}