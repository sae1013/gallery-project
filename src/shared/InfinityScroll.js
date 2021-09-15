import React,{Fragment,useEffect,useCallback,useRef} from 'react'
import _ from 'lodash';

import InfiniteSpinner from './InfiniteSpinner';

function InfinityScroll(props) {
    const dependency = [props.children,props.callNext,props.isNext,props.isLoading];
    
    const _throttle = _.throttle(()=>{
        
        if(props.isLoading){
            return
        }
        let scrollHeight= document.documentElement.scrollHeight;
        let scrollTop = document.documentElement.scrollTop
        let clientHeight = document.documentElement.clientHeight;
        
        if(scrollHeight-scrollTop-clientHeight < 300){
            props.callNext();
        } 
        
    },1000);

    const throttle = useCallback(_throttle,dependency); 
    
    useEffect(()=>{
        
        if(props.isLoading){ 
            return;
        }
        window.addEventListener('scroll', throttle);

        return ()=> {
            window.removeEventListener('scroll',throttle);
            throttle.cancel();
        }
    },dependency);


    return (
        <Fragment>
            {props.children}
            {props.isNext ? <InfiniteSpinner/>:null }
        </Fragment>
    )
}

InfinityScroll.defaultProps = {
    children:null,
    callNext:()=>{},
    isNext:null,
    isLoading:false
}
export default InfinityScroll
