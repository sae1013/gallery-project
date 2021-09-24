import React,{useEffect,useState,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';

import Image from '../elements/Image';
import Button from '../UI/Button';
import classes from './PostWrite.module.scss';
import FileUpload from '../components/post/FileUpload';
import {uiActions} from '../redux/modules/ui';
import {addPostFB,editPostFB,loadPostFB} from '../shared/api/Post';
import Spinner from '../elements/Spinner';

function PostWrite({history}) {
    
    const dispatch = useDispatch();
    const params = useParams();
    const isLogin = useSelector(state=> state.user.isLogin);
    const isLoginLoading = useSelector(state =>state.user.isLoading); // 로그인 중일때 flag
    const postIsLoading = useSelector(state=> state.post.isLoading);
    const [previewImg,setPreviewImg] = useState(null); 
    const [text,setText] = useState('');
    const textAreaRef = useRef();
    
    const loginButtonHandler = () => {
        history.replace('/login')
    }

    const homeButtonHandler = () => {
        history.replace('/')
    }

    const setPreviewImgHandler = (imgDataUrl) => {
        setPreviewImg(imgDataUrl);
    }
 
    const submitHandler = () => {
        dispatch(addPostFB({contents:textAreaRef.current.value,imgStringUrl:previewImg}));
    }

    const editSubmitHandler = ()=> {
        dispatch(editPostFB(params.id,text,previewImg));
    }

    const textAreaOnChange = (e) => {
        setText(e.target.value)
    }
    
    useEffect(()=>{ 
    
        dispatch(uiActions.floatButtonUpdate());
        if(params.id){ // postid가 존재할때 (editMode)
            dispatch(loadPostFB(params.id,setPreviewImg,setText));
        }
        
    },[]);
    

    let content;

    if(isLoginLoading){
        return null;
    }
    if(!isLogin){ 
        content = (
            <div className= {classes.container_login}>
                <p>잠깐! 로그인이 필요해요</p>
                <div>
                    <Button width="300px" display="block" margin="20px 0" fontSize="15px" onClick={loginButtonHandler}>로그인 하러가기</Button>
                    <Button width="300px" display="block" margin="20px 0" fontSize="15px" onClick={homeButtonHandler}>홈으로 가기</Button>
                </div>
            </div>
        )
    }
    else {
        content = (
        <div className={classes.container}>
            <p className={classes.title}>{params.id ? '게시글 수정' :'게시글 작성 '}</p>
            <FileUpload onSetPreviewImg = {setPreviewImgHandler}></FileUpload>

            <div className={classes.write_section}>
                <p>미리보기</p>
                {previewImg ? <div className={classes.img_container}>
                    <Image shape='rectangle' src={previewImg}></Image>
                </div>: null}
                <div className={classes.text_content}>
                    <p>게시글 내용</p>
                    <textarea ref={textAreaRef} value={text} onChange ={textAreaOnChange}></textarea>
                    {!postIsLoading && !params.id? <Button onClick={submitHandler} width='100%' fontSize='15px'>게시글 작성</Button> :
                    (!postIsLoading && params.id) ? <Button onClick={editSubmitHandler} width={'100%'} fontSize='15px'>게시글 수정</Button> 
                    :<Spinner shape='syncLoader'></Spinner>}
                </div>    
            </div>
            <div className={classes.padding}></div>
        </div>
        )
    };

    return content
}
export default PostWrite;
