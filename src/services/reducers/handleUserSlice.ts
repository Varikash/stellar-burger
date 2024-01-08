import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { logginUser, registerUser, fetchUser, refreshUser, updateUser, logOut } from "../../utils/apiBackend";
import { User, RegisterUser, LogginUser, FetchUser, LogOut } from "../../utils/ApiResponse.types";
import { RegisterAndUpdate, LogginForm } from "../../utils/apiBackend";
import { ErrorInfo } from "./forgotPasswordSlice";

type InitialState = {
  loading: boolean;
  success: boolean;
  loggedIn: boolean;
  registered: boolean;
  checked: boolean;
  error: null | SerializedError;
  user: User | null;
}

const initialState: InitialState = {
  loading: false,
  success: false,
  loggedIn: false,
  registered: false,
  checked: false,
  error: null,
  user: null,
}

export const createUser = createAsyncThunk<RegisterUser, RegisterAndUpdate>(
  'user/createUser',
  async (formData, thunkAPI) => {
    try {
      const response = await registerUser(formData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Неизвестная ошибка');
    }
  }
)


export const authUser = createAsyncThunk<LogginUser, LogginForm>(
  'user/authUser',
  async (formData, thunkAPI) => {
    try {
      const response = await logginUser(formData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Неизвестная ошибка');
    }
  }
)


export const checkUser = createAsyncThunk<FetchUser, void, { rejectValue: ErrorInfo }>(
  'user/checkUser', 
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return rejectWithValue({ message: 'Access token is missing' });
    }
    try {
      const response = await fetchUser(token);
      if (!response.success) {
        return rejectWithValue({ message: response.message || 'Failed to fetch user' });
      }
      return response;
    } catch (error) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return rejectWithValue({ message: 'Refresh token is missing' });
      }
      try {
        const refreshResponse = await refreshUser(refreshToken);
        localStorage.setItem('accessToken', refreshResponse.accessToken);
        const finalResponse = await fetchUser(refreshResponse.accessToken);
        if (!finalResponse.success) {
          return rejectWithValue({ message: finalResponse.message || 'Failed to refresh token' });
        }
        return finalResponse;
      } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return rejectWithValue({ message: 'Failed to refresh token' });
      }
    }
  }
);


export const updateUserInfo = createAsyncThunk<FetchUser, RegisterAndUpdate, { rejectValue: ErrorInfo }>(
  'user/updateUser',
  async (form, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return rejectWithValue({ message: 'Отсутствует token' });
    }

    try {
      const response = await updateUser(token, form);
      return response;
    } catch (error) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return rejectWithValue({ message: 'отсутствует refreshToken' });
      }

      try {
        const response = await refreshUser(refreshToken);
        localStorage.setItem('accessToken', response.accessToken);
        const newToken = localStorage.getItem('accessToken');

        if (!newToken) {
          return rejectWithValue({message: 'Не удалось получить новый токен'})
        }

        const finalResponse = await updateUser(newToken, form);
        return finalResponse;
      } catch (error) {
        return rejectWithValue({ message: 'Не удалось обновить токен или обновить информацию о пользователе' });
      }
    }
  }
);


export const logOutUser = createAsyncThunk<LogOut, void, { rejectValue: ErrorInfo }>(
  'user/logOut',
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return rejectWithValue({ message: 'Refresh token is missing' });
    }

    try {
      const response = await logOut(refreshToken);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      }
      return rejectWithValue({ message: 'Unknown error occurred' });
    }
  }
);

export const handleUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase (authUser.pending, (state) => {
      state.loading = true;
    })
    .addCase (authUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.loggedIn = true;
      state.user = action.payload.user;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    })
    .addCase (authUser.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    })
    .addCase (createUser.pending, (state) => {
      state.loading = true;
    })
    .addCase (createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.registered = true;
      state.loggedIn = true;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    })
    .addCase (createUser.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    })
    .addCase (checkUser.pending, (state) => {
      state.loading = true;
    })
    .addCase (checkUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.checked = true;
      state.user = action.payload.user;
      if (action.payload) {
        state.loggedIn = true;
      }
    })
    .addCase (checkUser.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.checked = true;
      state.error = action.error;
    })
    .addCase (updateUserInfo.pending, (state) => {
      state.loading = true;
    })
    .addCase (updateUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.user = action.payload.user;
        state.success = true;
      }
    })
    .addCase (updateUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error;
    })
    .addCase (logOutUser.fulfilled, (state) => {
      state.success = false;
      state.loggedIn = false;
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    })
  }
})

export default handleUserSlice.reducer;