import React from 'react'
import {useSelector} from 'react-redux';
import {apiKey} from '../shared/firebase';

function Permit(props) {
    const isLogin = useSelector(state => state.user.isLogin);
    const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const isSessionValue = sessionStorage.getItem(sessionKey) ? true: false;
    
    if(isLogin && isSessionValue){
        return (
            <React.Fragment>
                {props.children}
            </React.Fragment>
        )
    }
    else{
        return null;
    }
    
    
}

export default Permit
