import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendEmail } from "../../utils/apiBackend";

type ErrorInfo = {
  message: string;
}

type ResponseType = {
  success: boolean;
  message?: string;
}

type ForgotPasswordState = {
  loading: boolean;
  success: boolean;
  error: ErrorInfo | null | undefined;
}


const initialState: ForgotPasswordState = {
  loading: false,
  success: false,
  error: null,
}

export const checkEmail = createAsyncThunk<ResponseType, string, { rejectValue: ErrorInfo }>(
  'email/checkEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await sendEmail(email);
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
      return rejectWithValue({ message: 'Неизвестная ошибка' });
    }
  }
);

export const forgotPasswordSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
  }
})

export default forgotPasswordSlice.reducer;