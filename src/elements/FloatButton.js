import React from 'react' // 

import classes from './FloatButton.module.scss';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function FloatButton(props) {  
    
    const floatButtonUpdate = useSelector( state => state.ui.floatButtonUpdate);
    const history = useHistory();
    
    const postWriteHandler = () => {
        history.push('/write'); 
    } 
    
    if(history.location.pathname === '/write'){
        return null;        
    }
    
    
    return (
        <React.Fragment>
            <button className={classes.float_btn} onClick={postWriteHandler}>
                <span>+</span>    
            </button>
        </React.Fragment>
    )
}

export default FloatButton
