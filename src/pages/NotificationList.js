import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux';
import {realtimeDB} from '../shared/firebase';
import classes from './NotificationList.module.scss'
import NotificationItem from '../components/notify/NotificationItem';

function NotificationList() {
    const loginUser = useSelector(state => state.user.user?.userId);
    const [notiList,setNotiList] = useState([]); 

    useEffect(()=>{
        if(!loginUser){
            return
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

    return (
        <div className={classes.container}>
            {notiList.map((item)=>{
                return <NotificationItem key = {item.notiId} notiItem ={item}/>
            })}
        </div>
    )
}

export default NotificationList
