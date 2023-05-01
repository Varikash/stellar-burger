import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendEmail } from "../../utils/apiBackend";

const initialState = {
  loading: false,
  success: false,
  error: true
}

export const checkEmail = createAsyncThunk(
  'email/checkEmail',
  async(_,) => {}
)

export  const forgotPasswordSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {

  }
})