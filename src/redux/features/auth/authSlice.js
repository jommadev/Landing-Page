import { createSlice } from '@reduxjs/toolkit';
import { setCookie, deleteCookie, getCookies } from 'cookies-next';

const initialState = {
  accessToken: getCookies("accessToken") || '',
};




const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registration: (state, action) => {
      state.accessToken = action.payload.accessToken;
      setCookie('accessToken', action.payload.accessToken, {
        maxAge: null, // Session cookie
      });
      /* setCookie('accessToken', action.payload.accessToken, {
        maxAge: 60 * 60 * 24 * 7, // Cookie expires in 7 days
      }); */
    },
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      setCookie('accessToken', action.payload.accessToken, {
        maxAge: null,
      });
    },
    getToken:(state, action) => {
      state.accessToken
    },
    remove: () => {
      // Remove the cookies
      deleteCookie('accessToken');
    },
  },
});

export const { registration, login, remove, getToken } = authSlice.actions;
export default authSlice.reducer;
