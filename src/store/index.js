import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// import { getDefaultMiddleware } from "redux";
// import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import dataSlice from "./dataSlice";

const rootReducer = combineReducers({
    data: dataSlice.reducer
});

const persistedReducer = persistReducer(
    {
        key: "root",
        version: 1,
        storage: storage
    },
    rootReducer
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof rootReducer>;

export default store;