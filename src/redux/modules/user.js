import {createSlice} from '@reduxjs/toolkit';

import {getCookie,setCookie,deleteCookie} from '../../shared/Cookie';

const initialUser = {
    email:'',
    nickname:'',
    profileURL:'',
    userId:''
}
//  initialState
const initialState = {
    user: null,
    isLogin:false,
    isLoading:false,
};


// reducer
const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        setUser(state,action){
            state.user = {
                ...action.payload
            }

            state.isLogin = true;
        },

        logout(state,action){
            state.user = null;
            state.isLogin = false;
        },

        getUser(state,action){

        },
        setIsLoading(state,action){
            state.isLoading = action.payload;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;

