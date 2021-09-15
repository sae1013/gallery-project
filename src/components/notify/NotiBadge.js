import React,{useState,useEffect} from 'react'
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {realtimeDB} from '../../shared/firebase';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

function NotiBadge() {
    const history = useHistory();
    const loginUser = useSelector(state => state.user.user.userId);
    const [isRead,setIsRead] = useState(true); // 맨처음은 읽음처리

    const notificationCheckHandler = () => {
        const notiRef = realtimeDB.ref(`noti/${loginUser}`);
        notiRef.update({read:true});
        history.push('/notify');
    }

    useEffect(()=>{
        const notiDB = realtimeDB.ref(`noti/${loginUser}`); // 실시간DB 구독
        notiDB.on('value',(snapshot)=> {
            if(snapshot.exists() && 'read' in snapshot.val()){
                
                setIsRead(snapshot.val().read);
            }
            
        });
        return ()=>{
            notiDB.off();
        }
    },[]);

    return (
        <React.Fragment>
            <Badge color="secondary" variant="dot" invisible={isRead} onClick={notificationCheckHandler}>
                <NotificationsIcon></NotificationsIcon>
            </Badge>
        </React.Fragment>
    )
}

export default NotiBadge
