import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {realtimeDB} from '../shared/firebase';
import classes from './NotificationList.module.scss'
import NotificationItem from '../components/notify/NotificationItem';

function NotificationList() {
    const loginUser = useSelector(state => state.user.user?.userId);
    const [notiList,setNotiList] = useState([]); 
    const history = useHistory();

    useEffect(()=>{
        if(!loginUser){
            history.push('/login')
        }
        
        const notiListRef = realtimeDB.ref(`/noti/${loginUser}/list`).orderByChild('insertDate');
        notiListRef.once('value',(snapshot)=>{
            if(snapshot.exists()){
                const unorderedList = snapshot.val();
                
                const orderedNotiList = Object.keys(unorderedList).reverse().map((key)=>{
                    return unorderedList[key]
                });
                setNotiList(orderedNotiList);
            }
        });

    },[loginUser]);
    
    let emptyContent = (
        <div className={classes.emptyContainer}>
            <p className={classes.emptyHeader}>새로운 알람이 없습니다!</p>
        </div>
    )
    return (
        <div className={classes.container}>
            {notiList.length>0 ? notiList.map((item)=>{
                return <NotificationItem key = {item.notiId} notiItem ={item}/>
            }): null}
            {notiList.length===0? emptyContent: null}
        </div>
    )
}

export default NotificationList
