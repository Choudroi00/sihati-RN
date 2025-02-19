import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./useUser";
import { ChatReducer } from "./useChat";



const store = configureStore({
    reducer: {
        user: UserReducer,
        chat: ChatReducer
    }

})


const { dispatch, getState } = store;

export { store, dispatch, getState };

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;



