import { createSlice } from "@reduxjs/toolkit";

export const userListSlice = createSlice({
    name: "userList",
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //Get All Users
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //Delete All Users
        deleteUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users.splice(
                state.users.findIndex(item => item._id === action.payload), 1
            )
        },
        deleteUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //Update User
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.products[
                state.products.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.product;
        },
        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {getUsersStart, getUsersSuccess, getUsersFailure, deleteUsersStart, deleteUsersSuccess, deleteUsersFailure, updateUserStart, updateUserSuccess, updateUserFailure} = userListSlice.actions;

export default userListSlice.reducer;