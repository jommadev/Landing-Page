

import { configureStore } from '@reduxjs/toolkit';
import authReducher from './features/auth/authSlice';
import selectedItemsReducer from './features/addStock/addStockSlice';
import customRefetchReducer from './features/customRefetch/customRefetchSlice';
import userInformationReducher from './features/userInformation/userInformationSlice';
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './api/apiSlice'


export const store = configureStore({
  reducer: {
    auth: authReducher,
    selectedItems: selectedItemsReducer,
    customRefetch: customRefetchReducer,
    userInfo:userInformationReducher,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

//setupListeners(store.dispatch)

export const selectState = (state) => state;
export const selectAppDispatch = () => store.dispatch;

export const selectRootState = () => store.getState();
export const selectAppDispatchType = typeof store.dispatch;
