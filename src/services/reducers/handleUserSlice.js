import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logginUser, registerUser } from "../../utils/apiBackend";

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
  async(form) => {
    const response = await registerUser(form);
    return response
  }
)

export const authUser = createAsyncThunk(
  'user/authUser',
  async(form) => {
    const response = await logginUser(form);
    return response
  }
)

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
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    }
  }
})

export default handleUserSlice.reducer;