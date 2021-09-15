import {createSlice} from '@reduxjs/toolkit';

const initialState={ 
    floatButtonUpdate:false
}

const uiSlice = createSlice({
    name:'ui',
    initialState:initialState,
    reducers:{
        floatButtonUpdate(state,action){
            state.floatButtonUpdate = !(state.floatButtonUpdate)
        }

    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;

