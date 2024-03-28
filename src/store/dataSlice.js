import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const State = {
    profiles: null,
}

const initalState = State;

const dataSlice = createSlice({
    name: "data",
    initialState: initalState,

    reducers:{
        setProfiles: (state,action)=>{
            state.profiles = action.payload;
        }
    },
});

export default dataSlice;