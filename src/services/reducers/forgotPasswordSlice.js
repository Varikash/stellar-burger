import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendEmail } from "../../utils/apiBackend";

const initialState = {
  loading: false,
  success: false,
  error: null,
}

export const checkEmail = createAsyncThunk(
  'email/checkEmail',
  async (email) => {
    try {
      const response = await sendEmail(email);
      return response;
    } catch (error) {
      throw new Error(`Ошибка при отправке email: ${error.message}`);
    }
  }
);

export const forgotPasswordSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {},
  extraReducers: {
    [checkEmail.pending]: (state) => {
      state.loading = true;
    },
    [checkEmail.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [checkEmail.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    },
  }
})

export default forgotPasswordSlice.reducer;