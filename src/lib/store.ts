import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'lib/features/auth/authSlice'; // Import the auth reducer 
import parentsSlice from '../lib/features/parents/parentsSlice'; 


export const makeStore = () => {
  return configureStore({
    reducer: {auth: authReducer,parents: parentsSlice},
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']