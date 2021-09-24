import {createSlice} from '@reduxjs/toolkit';
import moment from "moment";
import {firestore} from '../../shared/firebase';

const initialState = {
    list:{}, 
    isLoading:false
}

const commentSlice = createSlice({
    name:'comment',
    initialState:initialState,
    reducers:{
        setComment(state,action){ 
            state.list[action.payload.postId] = action.payload.commentList;
        },

        addComment(state,action){
            state.list[action.payload.postId].unshift(action.payload.comment);
        },
        setLoading(state,action){
            state.isLoading = action.payload
        }
    }
});
export const commentActions = commentSlice.actions;
export default commentSlice;

