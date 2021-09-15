import React,{useState,useRef} from 'react'

import classes from './FileUpload.module.scss';
import {storage} from '../../shared/firebase';

function FileUpload({onSetPreviewImg}) {

    const inputRef = useRef();
    
    const uploadHandler = () => {
        const reader = new FileReader();
        const imageFile = inputRef.current.files[0];
        if(!imageFile){ // 이미지 파일이없는경우 에러처리
            return onSetPreviewImg(null);
        }
        reader.readAsDataURL(imageFile);
        reader.onloadend = () => {
            onSetPreviewImg(reader.result);
        }
    }

    return (
        <React.Fragment>
            <div className={classes.container}>    
                <input type="file" ref={inputRef} onChange = {uploadHandler}></input>
            </div>
        </React.Fragment>
    )
}

export default FileUpload
