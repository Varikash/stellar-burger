import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logginUser, registerUser, fetchUser, refreshUser, updateUser, logOut } from "../../utils/apiBackend";

const initialState = {
  loading: false,
  success: false,
  loggedIn: false,
  registered: false,
  error: null,
  user: []
}

export const createUser = createAsyncThunk(
  'user/createUser',
  registerUser
)

export const authUser = createAsyncThunk(
  'user/authUser',
  logginUser
)

export const checkUser = createAsyncThunk(
  'user/checkUser', 
  async () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const response = await fetchUser(token);
      return response.user;
    } catch (error) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await refreshUser(refreshToken);
          localStorage.setItem('accessToken', response.accessToken);
          const newToken = localStorage.getItem('accessToken');
          const finalResponse = await fetchUser(newToken);
          return finalResponse.user;
        } catch (error) {
          // Обработка ошибки обновления токена
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          return null;
        }
      } else {
        // Отсутствует refreshToken, пользователь должен выполнить вход заново
        return null;
      }
    }
  } else {
    // Отсутствует accessToken, пользователь должен выполнить вход заново
    return null;
  }
});

export const updateUserInfo = createAsyncThunk(
  'user/udpadeUser',
  async (form) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await updateUser(token, form);
        return response.user;
      } catch (error) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const response = await refreshUser(refreshToken);
            localStorage.setItem('accessToken', response.accessToken);
            const newToken = localStorage.getItem('accessToken');
            const finalResponse = await updateUser(newToken, form)
            return finalResponse.user;
          } catch (error) {
            return null;
          }
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  });

  export const logOutUser = createAsyncThunk(
    'user/logOut',
    async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const response = await logOut(refreshToken);
        return response;
      } else {
        throw new Error('Отсутствует refreshToken');
      }
    }
  );

export const handleUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [authUser.pending]: (state) => {
      state.loading = true;
    },
    [authUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.loggedIn = true;
      state.registered = true;
      state.user = action.payload;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    [authUser.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    },
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.registered = true;
      state.loggedIn = true;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    },
    [checkUser.pending]: (state) => {
      state.loading = true;
    },
    [checkUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
      if (action.payload) {
        state.registered = true;
        state.loggedIn = true;
      }
    },
    [checkUser.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    },
    [updateUserInfo.pending]: (state) => {
      state.loading = true;
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.user = action.payload;
        state.success = true;
      }
    },
    [updateUserInfo.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    },
    [logOutUser.fulfilled]: (state) => {
      state.success = false;
      state.registered = false;
      state.loggedIn = false;
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }
})

export default handleUserSlice.reducer;