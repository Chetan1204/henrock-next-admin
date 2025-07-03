import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setLoading,setParentDetail } from "../parents/parentsSlice";
import { loginUser } from 'app/server-actions/auth';
const isClient = typeof window !== 'undefined';


// Define the initial state for the auth slice
interface AuthState {
  isAuthenticated: boolean;
  parentDetails: {} | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: isClient ? !!localStorage.getItem('token') : false,
  parentDetails: null,
  token: null,
  loading: false,
  error: null,
};

export const parentLogin = createAsyncThunk(
  'auth/parentLogin',
  async (
    { email, password }: { email: string; password: string },
    {dispatch, rejectWithValue }
  ) => {
    try {
      const response = await loginUser({ email, password }) 
      const data  = response.data.result;
      // Save tokens to localStorage
      if (data.token && data) {
        dispatch(setLoading(true));
        dispatch(setParentDetail(data)); 
        localStorage.setItem('token', data.token);
        localStorage.setItem('parentDetail', JSON.stringify(data));
      }
      // Return user details and tokens
      return {
        role: 'parent',
        parentDetails: data,
        token: data.token,
        isAuthenticated:true
      };
    } catch (error: any) {
      // Reject with a proper error message
      return rejectWithValue(error.message || 'An error occurred during login');
    }
  }
);


// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.parentDetails = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(parentLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.token = '';
      })
      .addCase(parentLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.parentDetails = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(parentLogin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = '';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
