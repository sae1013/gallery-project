import {createSlice} from '@reduxjs/toolkit';
import { deletePostFB } from '../../shared/api/Post';

const initialState={
    list:[],
    paging:{
        start:null,
        next:null,
        size:0
    },
    isFirstLoaded:false,
    isLoading:false,
}

const initialPost = {
    userInfo: {
      
    },
    
  };

const postSlice = createSlice({
    name:'post',
    initialState:initialState,
    reducers:{
        setPost(state,action){  
            state.list.push(...action.payload.postList); 
            const purePostList = state.list.reduce((acc,cur)=>{  // 중복제거
                if(acc.findIndex((p)=>p.postId === cur.postId) === -1){ 
                    return [...acc, cur]
                }else{
                    return acc
                }
            },[]);
            state.list = purePostList;
            if(action.payload.paging){
                state.paging = action.payload.paging;
            }
            state.isFirstLoaded = true 
        },

        addPost(state,action){ 
            state.list.unshift(action.payload)
        },

        editPost(state,action){

            const index = state.list.findIndex((post)=> post.postId === action.payload.postId);
            if(index != -1){
                const post = state.list[index] 
                state.list[index] = {...post, ...action.payload.editObject}; 
            }
        },

        setLoading(state,action){
            state.isLoading = action.payload;
        },

        setFirstLoaded(state,action){
            state.isFirstLoaded = action.payload;
        },
        setPaging(state,action){
            state.paging = action.payload.paging;
        },

        deletePost(state,action){
            state.list = state.list.reduce((acc,cur)=>{
                if(cur.postId === action.payload ){
                    return acc
                }else{
                    return [...acc,cur]
                }
            },[])
        }
    }
});

export const postActions = postSlice.actions;
export default postSlice;

