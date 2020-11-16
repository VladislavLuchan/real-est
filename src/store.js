import { configureStore } from "@reduxjs/toolkit"
import userSlice from './userSlice'
import appSlice from './appSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    app: appSlice
  }
}) 