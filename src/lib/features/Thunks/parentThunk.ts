
import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  setLoading,
  setError,
  setParentDetail,
  setDashboardStudentData
} from "lib/features/parents/parentsSlice";
import setparentStudentList from "lib/features/parents/parentsSlice";
import { studentList, getDashboardStudent } from 'app/server-actions/parents/dashboard'; 

 
 
export const getParentDetails = createAsyncThunk(
  "store/getParentDetails",
  async (token: string, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const response = await studentList(token);

      console.log('response-------',response);
      dispatch(setParentDetail(response));
      dispatch(setLoading(false));

      return response.data; // Return data to fulfill the thunk
    } catch (error: any) {
      dispatch(setLoading(false));
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
      dispatch(setError(errorMessage));
      
      return rejectWithValue(errorMessage); // Reject with a custom error message
    }
  }
  
);


export const getParentStudentList = createAsyncThunk(
  "store/getParentStudentList",
  async (token: string, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const response = await studentList(token);

      console.log('getParentStudentList-------',response);
      dispatch(setparentStudentList(response));
      dispatch(setLoading(false));

      return response.data; // Return data to fulfill the thunk
    } catch (error: any) {
      dispatch(setLoading(false));
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
      dispatch(setError(errorMessage));
      
      return rejectWithValue(errorMessage); // Reject with a custom error message
    }
  }
  
);

export const getStudentDetails = createAsyncThunk(
  "store/getStudentDetails",
  async (token: string, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const response = await getDashboardStudent(token);

      console.log('setStudentDetails-------',response);
      dispatch(setDashboardStudentData(response));
      dispatch(setLoading(false));

      return response.data; // Return data to fulfill the thunk
    } catch (error: any) {
      dispatch(setLoading(false));
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
      dispatch(setError(errorMessage));
      
      return rejectWithValue(errorMessage); // Reject with a custom error message
    }
  }
  
);

